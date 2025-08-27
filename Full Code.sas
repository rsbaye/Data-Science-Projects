/**********************************************************************************
 * TRENDS IN HEALTH CARE INSURANCE COVERAGE AND MEDICAL EXPENDITURE AMONG ADULTS WITH
 * DIABETES: EVIDENCE FROM THE 2021-2022 MEPS ANALYSIS
 * 
 * Author: Richmond Baye
 * Date: August 2025
 * Data Source: MEPS Panel 26 Full Year Consolidated File (HC-244)
 * 
 * Purpose: Analyze healthcare coverage patterns, expenditures, and quality of care
 *          among U.S. adults with diabetes using nationally representative data
 **********************************************************************************/


/**********************************************************************************
 * SECTION 1: DATA IMPORT AND INITIAL SETUP
 **********************************************************************************/


FILENAME REFFILE '/home/u64312784/MEPS/h244.dta';

PROC IMPORT DATAFILE=REFFILE
	DBMS=DTA
	OUT=WORK.MEPS
	replace;
RUN;

PROC CONTENTS DATA=WORK.MEPS; RUN;
RUN;

%web_open_table(WORK.MEPS);
OPTIONS NOFMTERR MISSING=' ';



/* ============================================================
   SECTION 2: CREATE DIABETIC COHORT
   Purpose: Filter to adults (18+) with diagnosed diabetes
   ============================================================ */

DATA diabetics_base;
    SET WORK.MEPS;

    /* Keep only adults */
    IF AGEY2X < 18 THEN DELETE;

    /* Keep only those with diagnosed diabetes */
    IF DIABDXY2_M18 = 1; /* Diagnosed in 2022 */

    /* Keep only essential variables to reduce size */
    KEEP 
        DUPERSID AGEY2X SEX RACETHX LONGWT
        DIABDXY2_M18 MCRSEY2X MCAREY2X PRIVAT4
        DSEYY2R5 DSCHY2R5
        TOTEXPY2 RXEXPY2 ERDEXPY2 ERFEXPY2
        OPDRVY2;

    /* Rename for clarity */
    RENAME AGEY2X = age;
RUN;

/* Verify cohort size */
PROC SQL;
    SELECT COUNT(*) AS n_obs,
           MIN(age) AS min_age,
           MAX(age) AS max_age
    FROM diabetics_base;
    TITLE "Diabetic Cohort Summary";
QUIT;


/* ============================================================
   SECTION 3: DATA CLEANING & VARIABLE CREATION
   Purpose: Recode variables, handle missing, create flags
   ============================================================ */

DATA diabetics_analysis;
    SET diabetics_base;

    /* ===== INSURANCE COVERAGE ===== */
    /* Use edited flags: MCRSEY2X, MCAREY2X, PRIVAT4 */
    IF MCRSEY2X IN (1,2) THEN medicare = (MCRSEY2X = 1);
    ELSE medicare = .;

    IF MCAREY2X IN (1,2) THEN medicaid = (MCAREY2X = 1);
    ELSE medicaid = .;

    IF PRIVAT4 IN (1,2) THEN private = (PRIVAT4 = 1);
    ELSE private = .;

    /* Any insurance coverage */
    IF medicare = 1 OR medicaid = 1 OR private = 1 THEN insured = 1;
    ELSE IF medicare = 0 AND medicaid = 0 AND private = 0 THEN insured = 0;
    ELSE insured = .;

    /* ===== PREVENTIVE CARE ===== */
    /* Dilated eye exam in 2022 */
    IF DSEYY2R5 IN (1,2) THEN had_eye_exam = 1;
    ELSE IF DSEYY2R5 IN (3,4) THEN had_eye_exam = 0;
    ELSE had_eye_exam = .;

    /* Cholesterol check in 2022 */
    IF DSCHY2R5 IN (1,2) THEN had_chol_check = 1;
    ELSE IF DSCHY2R5 IN (3,4) THEN had_chol_check = 0;
    ELSE had_chol_check = .;

    /* ===== EXPENDITURES ===== */
    IF TOTEXPY2 >= 0 THEN total_spending = TOTEXPY2;
    ELSE total_spending = .;

    IF RXEXPY2 >= 0 THEN rx_spending = RXEXPY2;
    ELSE rx_spending = .;

    IF ERDEXPY2 >= 0 THEN er_dr_spending = ERDEXPY2;
    ELSE er_dr_spending = .;

    IF ERFEXPY2 >= 0 THEN er_facility_spending = ERFEXPY2;
    ELSE er_facility_spending = .;

    /* ER visit proxy */
    IF (er_dr_spending > 0 OR er_facility_spending > 0) THEN er_visit = 1;
    ELSE IF (er_dr_spending = 0 AND er_facility_spending = 0) THEN er_visit = 0;
    ELSE er_visit = .;

    /* ===== UTILIZATION ===== */
    IF OPDRVY2 >= 0 THEN op_visits = OPDRVY2;
    ELSE op_visits = .;

    /* ===== DEMOGRAPHICS ===== */
    /* Age groups */
	IF 18 <= AGEY2X <= 34 THEN age_group = 1;
	ELSE IF 35 <= AGEY2X <= 49 THEN age_group = 2;
	ELSE IF 50 <= AGEY2X <= 64 THEN age_group = 3;
	ELSE IF AGEY2X >= 65 THEN age_group = 4;

    /* Sex */
    IF SEX = 1 THEN sex_char = "Male";
    ELSE IF SEX = 2 THEN sex_char = "Female";
    ELSE sex_char = "Other";

    /* Race */
    IF RACETHX = 1 THEN race_label = "Hispanic";
    ELSE IF RACETHX = 2 THEN race_label = "Non-Hispanic White";
    ELSE IF RACETHX = 3 THEN race_label = "Non-Hispanic Black";
    ELSE race_label = "Other";

    /* High-cost patient */
    IF total_spending > 10000 THEN high_cost = 1;
    ELSE IF total_spending >= 0 THEN high_cost = 0;
    ELSE high_cost = .;

    /* Survey weight */
    weight = LONGWT;
    IF weight <= 0 OR weight = . THEN weight = .;

    /* ===== LABELS ===== */
    LABEL 
        total_spending = "Total Healthcare Spending (2022)"
        rx_spending = "Prescription Drug Spending (2022)"
        op_visits = "# Outpatient Physician Visits (2022)"
        er_visit = "Had ER Visit in 2022 (Proxy)"
        had_eye_exam = "Had Dilated Eye Exam in 2022"
        had_chol_check = "Had Cholesterol Check in 2022"
        insured = "Has Health Insurance Coverage"
        high_cost = "High-Cost Patient (> $10,000)"
        weight = "Longitudinal Survey Weight";

    /* Keep final analysis variables */
    KEEP 
        DUPERSID age age_group sex_char race_label 
        medicare medicaid private insured
        had_eye_exam had_chol_check 
        total_spending rx_spending op_visits er_visit high_cost 
        weight;

RUN;

/* Check final dataset */
PROC PRINT DATA=diabetics_analysis (OBS=5);
    TITLE "First 5 Observations in Final Dataset";
RUN;

PROC SQL;
    SELECT COUNT(*) AS n, 
           AVG(total_spending) AS avg_spending FORMAT=DOLLAR12.2,
           AVG(insured) AS pct_insured FORMAT=PERCENT8.1
    FROM diabetics_analysis;
QUIT;


/*Check for missing observation*/
PROC FREQ DATA=diabetics_analysis;
    TABLES _CHARACTER_ / MISSING;
    TABLES _NUMERIC_ / MISSING;
RUN;


PROC SQL;
    SELECT "Total Adults in MEPS" AS Step, COUNT(*) AS N FROM WORK.MEPS
    UNION
    SELECT "Adults Age >=18", COUNT(*) FROM WORK.MEPS WHERE AGEY2X >= 18
    UNION
    SELECT "With Diagnosed Diabetes", COUNT(*) FROM WORK.MEPS WHERE AGEY2X >= 18 AND DIABDXY2_M18 = 1
    UNION
    SELECT "With Complete Data", COUNT(*) FROM diabetics_analysis WHERE weight > 0;
QUIT;



/**********************************************************************************
 * SECTION 4: DATA VALIDATION
 **********************************************************************************/

TITLE "Data Validation: Sample Size and Missing Data";

/* Sample size */
PROC SQL;
    SELECT COUNT(*) AS Total_Diabetic_Adults
    FROM diabetics_analysis;
QUIT;

/* Missing data patterns */
PROC MEANS DATA=diabetics_analysis N NMISS;
    VAR total_spending had_eye_exam had_chol_check 
        office_visits insured;
RUN;


/* ============================================================
   SECTION 5: EXPLORATORY DATA ANALYSIS (EDA)
   Purpose: Generate weighted descriptive statistics
   Track average spending, who has insurance and who recieves preventive care 
   ============================================================ */

/* Weighted means for spending and utilization */
PROC SURVEYMEANS DATA=diabetics_analysis MEAN SUM STD MEDIAN;
    WEIGHT weight;
    VAR total_spending rx_spending op_visits er_visit;
    TITLE "Weighted Descriptive Statistics: Diabetic Adults (2022)";
RUN;

/* Insurance coverage rates */
PROC SURVEYFREQ DATA=diabetics_analysis;
    WEIGHT weight;
    TABLES insured medicare medicaid private / CL;
    FORMAT insured yesno. medicare yesno. medicaid yesno. private yesno.;
    TITLE "Insurance Coverage Among Diabetic Adults (2022)";
RUN;

/* Preventive care rates */
PROC SURVEYFREQ DATA=diabetics_analysis;
    WEIGHT weight;
    TABLES had_eye_exam had_chol_check / CL;
    FORMAT had_eye_exam yesno. had_chol_check yesno.;
    TITLE "Preventive Care Utilization Among Diabetic Adults (2022)";
RUN;

PROC SGPLOT DATA=diabetics_analysis;
    HISTOGRAM total_spending / TRANSPARENCY=0.5;
    DENSITY total_spending / TYPE=KERNEL;
    XAXIS LABEL="Total Annual Spending ($)";
    TITLE "Distribution of Healthcare Spending Among Diabetic Adults";
RUN;



/* ============================================================
   SECTION 6: QUALITY METRICS
   Purpose: Calculate performance indicators
   ============================================================ */

PROC TABULATE DATA=diabetics_analysis;
    CLASS insured;
    VAR had_eye_exam had_chol_check;
    WEIGHT weight;
    TABLE insured ALL,
          (had_eye_exam * (N MEAN) had_chol_check * (N MEAN)) * F=PERCENT8.1;
    FORMAT had_eye_exam yesno. had_chol_check yesno.;
    TITLE "Quality of Diabetes Care by Insurance Status (2022)";
RUN;


/* Spending by insurance status */
TITLE "Table 5: Healthcare Spending by Insurance Status";
PROC SURVEYMEANS DATA=diabetics_analysis MEAN SUM STD MEDIAN;
    WEIGHT weight;  /* Correct weight: LONGWT */
    CLASS insured;
    VAR total_spending op_visits er_visit;
    FORMAT insured YESNO.;
    TITLE "Table 5: Healthcare Spending and Utilization by Insurance Status";
RUN;

/* Quality measures by insurance */
TITLE "Table 6: Quality of Care by Insurance Status";
PROC SURVEYFREQ DATA=diabetics_analysis;
    WEIGHT weight;
    TABLES insured * had_eye_exam insured * had_chol_check / ROW CL;
    FORMAT insured had_eye_exam had_chol_check YESNO.;
    TITLE "Table 6: Quality of Care by Insurance Status";
RUN;


/**********************************************************************************
 * SECTION 7: STATISTICAL MODELING
 **********************************************************************************/
ODS GRAPHICS / WIDTH=8IN HEIGHT=6IN;

/* Figure 1: Average spending by insurance status */
TITLE "Figure 1: Average Healthcare Spending by Insurance Status";
PROC SGPLOT DATA=diabetics_analysis;
    VBAR insured / RESPONSE=total_spending STAT=MEAN 
                   WEIGHT=weight DATALABEL FILLATTRS=(COLOR=STEELBLUE);
    YAXIS LABEL="Average Annual Spending ($)" GRID;
    XAXIS LABEL="Insurance Status";
    FORMAT insured YESNO. total_spending DOLLAR8.;
RUN;



TITLE "Summary Table: Key Indicators by Insurance Status";
PROC TABULATE DATA=diabetics_analysis;
    CLASS insured;
    VAR total_spending op_visits had_eye_exam;
    WEIGHT weight;
    TABLE insured=' ' ALL='Total',
          (total_spending='Healthcare Spending ($)' * (N='N' MEAN='Mean'*F=DOLLAR8. MEDIAN='Median'*F=DOLLAR8.)
           op_visits='Office Visits' * (MEAN='Mean'*F=5.1)
           had_eye_exam='Eye Exam Rate' * (MEAN='Rate'*F=PERCENT8.1))
          / MISSTEXT='--';
    FORMAT insured YESNO.;
RUN;


PROC SURVEYFREQ DATA=diabetics_analysis;
    WEIGHT weight;
    TABLES race_label * insured / ROW CL;
    TITLE "Insurance Coverage by Race/Ethnicity";
RUN;


PROC SURVEYMEANS DATA=diabetics_analysis;
    CLASS high_cost;
    VAR age op_visits er_visit;
    WEIGHT weight;
    TITLE "Characteristics of High-Cost vs. Non-High-Cost Patients";
RUN;


/* Healthcare spending and utilization by age groups */
PROC SURVEYMEANS DATA=diabetics_analysis MEAN STD MEDIAN;
    WEIGHT weight;
    CLASS age_group;
    VAR total_spending rx_spending op_visits;
    FORMAT age_group agegrp.;
    TITLE "Healthcare Spending by Age Group Among Diabetic Adults";
RUN;

/* Preventive care by age group */
PROC SURVEYFREQ DATA=diabetics_analysis;
    WEIGHT weight;
    TABLES age_group * had_eye_exam age_group * had_chol_check / ROW CL;
    TITLE "Preventive Care Utilization by Age Group";
RUN;


/* Spending patterns by gender */
PROC SURVEYMEANS DATA=diabetics_analysis MEAN MEDIAN;
    WEIGHT weight;
    CLASS sex_char;
    VAR total_spending rx_spending op_visits;
    TITLE "Healthcare Spending by Gender";
RUN;

/* Insurance coverage by gender */
PROC SURVEYFREQ DATA=diabetics_analysis;
    WEIGHT weight;
    TABLES sex_char * insured / ROW CL CHISQ;
    TITLE "Insurance Coverage by Gender";
RUN;


/* Characteristics of high-cost patients */
PROC SURVEYFREQ DATA=diabetics_analysis;
    WEIGHT weight;
    TABLES high_cost * (insured medicare medicaid private) / ROW CL;
    TITLE "Insurance Coverage Among High-Cost Diabetic Patients";
RUN;

/* Quality of care among high-cost patients */
PROC SURVEYFREQ DATA=diabetics_analysis;
    WEIGHT weight;
    TABLES high_cost * had_eye_exam high_cost * had_chol_check / ROW CL;
    TITLE "Preventive Care Among High-Cost vs Low-Cost Patients";
RUN;


/* ER visit patterns by demographics */
PROC SURVEYFREQ DATA=diabetics_analysis;
    WEIGHT weight;
    TABLES (age_group race_label insured) * er_visit / ROW CL;
    TITLE "Emergency Room Utilization Patterns";
RUN;

/* Spending comparison: ER users vs non-users */
PROC SURVEYMEANS DATA=diabetics_analysis MEAN MEDIAN;
    WEIGHT weight;
    CLASS er_visit;
    VAR total_spending rx_spending op_visits;
    TITLE "Healthcare Spending: ER Users vs Non-Users";
RUN;


/* Create insurance type combinations */
DATA diabetics_extended;
    SET diabetics_analysis;
    
    LENGTH ins_type $20;
    IF medicare=1 AND medicaid=1 THEN ins_type = "Dual Eligible";
    ELSE IF medicare=1 AND private=1 THEN ins_type = "Medicare+Private";
    ELSE IF medicare=1 THEN ins_type = "Medicare Only";
    ELSE IF medicaid=1 THEN ins_type = "Medicaid Only";
    ELSE IF private=1 THEN ins_type = "Private Only";
    ELSE ins_type = "Uninsured";
RUN;

PROC SURVEYFREQ DATA=diabetics_extended;
    WEIGHT weight;
    TABLES ins_type / CL;
    TITLE "Distribution of Insurance Types";
RUN;

PROC SURVEYMEANS DATA=diabetics_extended MEAN MEDIAN;
    WEIGHT weight;
    CLASS ins_type;
    VAR total_spending rx_spending;
    TITLE "Spending by Detailed Insurance Type";
RUN;



/* Create composite quality score */
DATA diabetics_quality;
    SET diabetics_analysis;
    
    /* Quality score (0-2) based on preventive care received */
    quality_score = 0;
    IF had_eye_exam = 1 THEN quality_score + 1;
    IF had_chol_check = 1 THEN quality_score + 1;
    
    /* Quality categories */
    IF quality_score = 2 THEN quality_cat = "High Quality";
    ELSE IF quality_score = 1 THEN quality_cat = "Moderate Quality";
    ELSE IF quality_score = 0 THEN quality_cat = "Low Quality";
    ELSE quality_cat = "Missing";
RUN;

PROC SURVEYFREQ DATA=diabetics_quality;
    WEIGHT weight;
    TABLES quality_cat * insured / ROW CL;
    TITLE "Quality of Care by Insurance Status";
RUN;


/* Comprehensive disparities analysis */
PROC SURVEYMEANS DATA=diabetics_analysis MEAN STD;
    WEIGHT weight;
    CLASS race_label;
    VAR total_spending rx_spending op_visits;
    TITLE "Healthcare Spending by Race/Ethnicity";
RUN;

/* Triple cross-tabulation */
PROC SURVEYFREQ DATA=diabetics_analysis;
    WEIGHT weight;
    TABLES race_label * insured * had_eye_exam / ROW CL;
    TITLE "Eye Exam Rates by Race and Insurance Status";
RUN;



/* Cost per visit analysis */
DATA diabetics_efficiency;
    SET diabetics_analysis;
    
    /* Cost per outpatient visit */
    IF op_visits > 0 THEN cost_per_visit = total_spending / op_visits;
    ELSE cost_per_visit = .;
    
    /* High utilizer flag */
    IF op_visits >= 10 THEN high_utilizer = 1;
    ELSE IF op_visits >= 0 THEN high_utilizer = 0;
    ELSE high_utilizer = .;
RUN;

PROC SURVEYMEANS DATA=diabetics_efficiency MEAN MEDIAN;
    WEIGHT weight;
    CLASS insured;
    VAR cost_per_visit;
    TITLE "Cost Efficiency by Insurance Status";
RUN;




/* Box plots for spending distribution */
PROC SGPLOT DATA=diabetics_analysis;
    VBOX total_spending / CATEGORY=insured WEIGHT=weight;
    YAXIS LABEL="Total Healthcare Spending ($)" TYPE=LOG;
    TITLE "Distribution of Healthcare Spending by Insurance Status";
RUN;

/* Preventive care comparison chart */
PROC SGPLOT DATA=diabetics_analysis;
    VBAR race_label / RESPONSE=had_eye_exam STAT=MEAN 
                     GROUP=insured GROUPDISPLAY=CLUSTER
                     WEIGHT=weight DATALABEL;
    YAXIS LABEL="Eye Exam Rate" VALUES=(0 to 1 by 0.2) GRID;
    TITLE "Eye Exam Rates by Race and Insurance Status";
RUN;



/* Chi-square tests for associations */
PROC SURVEYFREQ DATA=diabetics_analysis;
    WEIGHT weight;
    TABLES insured * high_cost / CHISQ CL;
    TITLE "Association Between Insurance and High-Cost Status";
RUN;

/* Regression analysis predicting high costs */
PROC SURVEYLOGISTIC DATA=diabetics_analysis;
    WEIGHT weight;
    CLASS insured (REF='0') race_label (REF='Non-Hispanic White') 
          sex_char (REF='Male') age_group (REF='1');
    MODEL high_cost = insured race_label sex_char age_group op_visits er_visit;
    TITLE "Factors Associated with High Healthcare Costs";
RUN;


/* Clear formatting */
TITLE;
FOOTNOTE;

/* Summary message */
%PUT NOTE: Diabetes healthcare analysis completed successfully;
%PUT NOTE: Dataset DIABETICS_ANALYSIS contains final analytical dataset;

/* End program */
QUIT;