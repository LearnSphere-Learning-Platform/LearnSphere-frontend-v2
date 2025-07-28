import { Clock, CheckCircle } from 'lucide-react';

export default function LessonInfo({ currentLesson }) {
  if (!currentLesson) return null;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2" style={{ color: '#333A2F' }}>
        {currentLesson.title}
      </h2>
      <div className="flex items-center space-x-4 text-gray-600">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {currentLesson.duration}
        </div>
        {currentLesson.completed && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            Completed
          </div>
        )}
      </div>
    </div>
  );
}