import React from 'react';
import { ArrowRight, Users, BookOpen, TrendingUp, Heart } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { industries, caseStudies } from '../mock';

const Industries = () => {
  const handleLearnMore = (industryName) => {
    alert(`Learn more about ${industryName} - This will show detailed case studies!`);
  };

  const handleViewCase = (caseTitle) => {
    alert(`View case study: ${caseTitle} - This will open detailed case study!`);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-4">
            Sectors We Serve
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Expertise Across Industries
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We bring deep sector knowledge and specialized research capabilities to drive 
            evidence-based solutions across diverse industries and communities.
          </p>
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTUyNzU2MTJ8MA&ixlib=rb-4.1.0&q=85"
            alt="Data analytics dashboard"
            className="rounded-2xl shadow-2xl w-full max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry) => {
              const getIcon = () => {
                switch (industry.name) {
                  case 'Healthcare & Public Health':
                    return Heart;
                  case 'Education & Learning':
                    return BookOpen;
                  case 'Economic Development':
                    return TrendingUp;
                  case 'Social Policy':
                    return Users;
                  default:
                    return Users;
                }
              };
              const IconComponent = getIcon();

              return (
                <Card key={industry.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="aspect-w-16 aspect-h-12 lg:aspect-h-full bg-gray-200">
                      <img
                        src={industry.image}
                        alt={industry.name}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-emerald-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{industry.name}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{industry.description}</p>
                      <div className="flex items-center justify-between mb-6">
                        <Badge variant="secondary" className="text-sm">
                          {industry.projects} Projects Completed
                        </Badge>
                      </div>
                      <Button 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => handleLearnMore(industry.name)}
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Case Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-world examples of how our research has driven meaningful change across different sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">{study.sector}</Badge>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{study.title}</h3>
                  <p className="text-gray-600 mb-4">{study.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Impact:</span>
                      <span className="text-sm font-medium text-emerald-600">{study.impact}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Duration:</span>
                      <span className="text-sm font-medium text-gray-900">{study.duration}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                    onClick={() => handleViewCase(study.title)}
                  >
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Cross-Sector Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable outcomes across diverse industries and communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">2.3M</div>
              <div className="text-gray-600">People Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">$15M</div>
              <div className="text-gray-600">Impact Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">150+</div>
              <div className="text-gray-600">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Make an Impact in Your Sector?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Partner with Evidentia to leverage our deep sector expertise and proven research methodologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg"
              onClick={() => handleLearnMore('Your Sector')}
            >
              Discuss Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
            >
              View All Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;