import React, { useState } from 'react';
import { ArrowRight, MapPin, Clock, Briefcase, GraduationCap, Users, Award, Heart } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { jobOpenings, companyInfo } from '../mock';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyJob = (jobTitle) => {
    alert(`Apply for ${jobTitle} - This will open application form!`);
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
  };

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: Users,
      title: "Collaborative Culture", 
      description: "Work with diverse, passionate researchers from around the world"
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "Continuous learning opportunities and conference attendance"
    },
    {
      icon: Award,
      title: "Impact & Recognition",
      description: "Contribute to meaningful research with recognition programs"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                Join Our Team
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Shape the Future of Evidence-Based Research
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join a diverse team of researchers, analysts, and consultants dedicated to creating 
                meaningful change through rigorous research and data-driven insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => document.getElementById('open-positions').scrollIntoView({ behavior: 'smooth' })}
                >
                  View Open Positions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  Learn About Our Culture
                </Button>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MHx8fHwxNzU1Mjc1NjIzfDA&ixlib=rb-4.1.0&q=85"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Work at Evidentia?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {companyInfo.culture}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-7 w-7 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our growing team and contribute to impactful research that drives positive change.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer" 
                      onClick={() => handleViewJob(job)}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{job.department}</Badge>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="mr-4">{job.location}</span>
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span>{job.experience}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    <Button 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyJob(job.title);
                      }}
                    >
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Job Details Sidebar */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              {selectedJob ? (
                <Card className="shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedJob.title}</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-3 text-emerald-600" />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-3 text-emerald-600" />
                        <span>{selectedJob.type}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-5 w-5 mr-3 text-emerald-600" />
                        <span>{selectedJob.experience} experience</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                      <p className="text-gray-600">{selectedJob.description}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Advanced degree in relevant field</li>
                        <li>• {selectedJob.experience} of professional experience</li>
                        <li>• Strong analytical and communication skills</li>
                        <li>• Experience with research methodologies</li>
                      </ul>
                    </div>

                    <Button 
                      size="lg"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => handleApplyJob(selectedJob.title)}
                    >
                      Apply for This Position
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Position</h3>
                    <p className="text-gray-600">
                      Click on any job listing to view detailed requirements and apply.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Hiring Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in a transparent, fair process that allows both candidates and our team to make informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Application Review",
                description: "We carefully review all applications and respond within one week."
              },
              {
                step: "02",
                title: "Initial Interview",
                description: "Video call to discuss your background and interest in the role."
              },
              {
                step: "03",
                title: "Technical Assessment",
                description: "Role-specific assessment to evaluate relevant skills and expertise."
              },
              {
                step: "04",
                title: "Final Interview",
                description: "Meet the team and discuss how you'll contribute to our mission."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Don't see the perfect role? We're always interested in hearing from talented researchers and analysts.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg"
            onClick={() => handleApplyJob('General Application')}
          >
            Send Us Your Resume
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Careers;