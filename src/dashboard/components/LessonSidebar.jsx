import { ChevronDown, ChevronRight, CheckCircle, FileText } from 'lucide-react';
import { useState } from 'react';

const LessonSidebar = ({
  currentCourse,
  courseContent,
  expandedModule,
  onModuleToggle,
  onLessonSelect,
  getCompletedLessonsCount,
  getTotalLessonsCount,
  getProgressPercentage,
  canGetCertificate,
  showDiscussion,
  setShowDiscussion,
  discussions,
  likedComments,
  handleLike,
  handleReply,
  replyTo,
  replyContent,
  setReplyContent,
  handleReplySubmit,
  newComment,
  setNewComment,
  handleCommentSubmit,
  onLessonCheckboxToggle
}) => {
  // Function to check if a module is completed
  const isModuleCompleted = (module) => {
    return module.lessons.every(lesson => lesson.completed);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4" style={{ color: '#333A2F' }}>Course Content</h2>
      
      {/* Scrollable Course Content with custom scrollbar */}
      <div 
        className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar" 
        style={{ 
          maxHeight: '60vh',
          scrollbarWidth: 'thin',
          scrollbarColor: '#333A2F #EBEDDF'
        }}
      >
        
        {currentCourse && courseContent[currentCourse.id] && courseContent[currentCourse.id].modules.map(module => (
          <div key={module.id} className="border-b pb-4">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onModuleToggle(module.id)}
            >
              <div className="flex items-center">
                <h3 className="text-lg font-semibold" style={{ color: '#333A2F' }}>
                  {module.title}
                </h3>
                {isModuleCompleted(module) && (
                  <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                )}
              </div>
              {Array.isArray(expandedModule) ? expandedModule.includes(module.id) : expandedModule === module.id ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </div>
            {(Array.isArray(expandedModule) ? expandedModule.includes(module.id) : expandedModule === module.id) && (
              <ul className="mt-2 divide-y divide-gray-200 bg-gray-50 rounded-lg overflow-hidden">
                <li className="flex font-semibold px-4 py-2 bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
                  <span className="flex-1">Lesson</span>
                  <span className="w-20 text-center">Duration</span>
                </li>
                {module.lessons.map(lesson => (
                  <li 
                    key={lesson.id} 
                    className={`flex items-center px-4 py-3 text-sm transition-colors ${lesson.type === 'test' || lesson.type === 'final-test' ? 'font-semibold' : ''}`}
                    style={{ borderBottom: '1px solid #f1f1f1' }}
                  >
                    <span className="flex items-center flex-1" style={{ color: '#333A2F' }}>
                      {lesson.type === 'video' || lesson.type === 'demo' || lesson.type === 'theory' ? (
                        <input
                          type="checkbox"
                          checked={lesson.completed || false}
                          onChange={(e) => {
                            e.stopPropagation();
                            console.log('=== DEBUG INFO ===');
                            console.log('Lesson ID:', lesson.id);
                            console.log('Module ID:', module.id);
                            console.log('Lesson Type:', lesson.type);
                            console.log('Current Completed State:', lesson.completed);
                            console.log('Course ID:', currentCourse.id);
                            console.log('Course Content Keys:', Object.keys(courseContent));
                            console.log('Module Lessons:', module.lessons.map(l => ({ id: l.id, completed: l.completed, type: l.type })));
                            onLessonCheckboxToggle(module.id, lesson.id);
                          }}
                          className="mr-2 w-4 h-4 rounded focus:ring-2 focus:ring-[#333A2F]"
                          style={{
                            backgroundColor: lesson.completed ? '#333A2F' : '#EBEDDF',
                            border: 'none',
                            accentColor: '#333A2F'
                          }}
                        />
                      ) : (
                        <span className="mr-2 inline-flex items-center px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                          <FileText className="w-4 h-4 mr-1" />
                          {lesson.type === 'test' ? 'Test' : 'Final'}
                        </span>
                      )}
                      <span
                        onClick={() => onLessonSelect(lesson)}
                        style={{ cursor: 'pointer' }}
                        className="hover:text-green-600 transition-colors"
                      >
                        {lesson.title}
                      </span>
                    </span>
                    <span className="w-20 text-center text-xs text-gray-500">{lesson.duration}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Fixed Bottom Section */}
      <div className="mt-6 pt-4 border-t">
        {/* Course Progress */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#333A2F' }}>Progress</h3>
          <div className="flex items-center justify-between mb-2">
            <span>{getCompletedLessonsCount()} of {getTotalLessonsCount()} lessons completed</span>
            <span>{getProgressPercentage()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${getProgressPercentage()}%`,
                backgroundColor: '#333A2F'
              }}
            ></div>
          </div>
        </div>
        
        {/* Certificate Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#333A2F' }}>Certificate of Completion</h3>
          <p className="text-sm text-gray-600 mb-4">
            Complete all lessons and pass the final assessment to earn your certificate.
          </p>
          {canGetCertificate() ? (
            <button 
              className="w-full py-3 px-6 rounded-lg text-white font-semibold"
              style={{ backgroundColor: '#333A2F' }}
            >
              Download Certificate
            </button>
          ) : (
            <button 
              className="w-full py-3 px-6 rounded-lg text-white font-semibold opacity-50 cursor-not-allowed"
              disabled
            >
              Complete Course to Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonSidebar; 