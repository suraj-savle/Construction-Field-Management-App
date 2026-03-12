import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants/mockData';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';

const ProjectList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <p className="text-gray-500">Select a project to file a DPR</p>
      </header>

      <div className="max-w-4xl mx-auto grid gap-4">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate(`/dpr/${project.id}`)}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg text-gray-900">{project.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.color}`}>
                  {project.status}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin size={14} /> {project.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} /> Started: {project.startDate}
                </div>
              </div>
            </div>
            
            <ChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;