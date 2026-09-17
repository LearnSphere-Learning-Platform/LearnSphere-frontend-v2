import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  useParams: () => ({ courseId: 'course-1', lessonId: 'lesson-1' }),
  useNavigate: () => navigateMock,
}));

const useCourseByIdMock = vi.fn();
vi.mock('../../hooks/useCourseById', () => ({
  default: (...args) => useCourseByIdMock(...args),
}));

let lastCodeEditorProps = null;
vi.mock('../../quiz/CodeEditor', () => ({
  default: (props) => {
    lastCodeEditorProps = props;
    return <div data-testid="code-editor-stub">{props.language}</div>;
  },
}));

import CodingExercisePage from '../../pages/CodingExercisePage';

function courseWithLesson(lessonOverrides = {}) {
  return {
    course_name: 'React Basics',
    course_content: [
      {
        session: 'Intro',
        content: [{ id: 'lesson-1', title: 'Coding Challenge', type: 'coding', ...lessonOverrides }],
      },
    ],
  };
}

describe('CodingExercisePage', () => {
  beforeEach(() => {
    navigateMock.mockClear();
    useCourseByIdMock.mockReset();
    lastCodeEditorProps = null;
  });

  it('shows a loading state while the course is being fetched', () => {
    useCourseByIdMock.mockReturnValue({ course: null, loading: true });
    render(<CodingExercisePage />);
    expect(screen.getByText(/loading coding exercise/i)).toBeInTheDocument();
  });

  it('redirects to the dashboard when the lesson does not exist', () => {
    useCourseByIdMock.mockReturnValue({
      course: { course_name: 'React Basics', course_content: [] },
      loading: false,
    });
    render(<CodingExercisePage />);
    expect(navigateMock).toHaveBeenCalledWith('/user/course/course-1/dashboard');
  });

  it('falls back to the generic default exercise when no coding_config exists', () => {
    useCourseByIdMock.mockReturnValue({ course: courseWithLesson(), loading: false });
    render(<CodingExercisePage />);

    expect(lastCodeEditorProps.language).toBe('JavaScript');
    expect(lastCodeEditorProps.starter).toBe('// Write your code here');
    expect(lastCodeEditorProps.instructions).toBe('Complete the coding exercise as described.');
  });

  it('uses the instructor-configured coding_config when present', () => {
    const coding_config = {
      instructions: 'Reverse the given array in place.',
      starterCode: 'function reverse(arr) {}',
      language: 'Python',
      expectedOutput: '[3,2,1]',
      hint: 'Use two pointers',
    };
    useCourseByIdMock.mockReturnValue({ course: courseWithLesson({ coding_config }), loading: false });
    render(<CodingExercisePage />);

    expect(lastCodeEditorProps.language).toBe('Python');
    expect(lastCodeEditorProps.starter).toBe('function reverse(arr) {}');
    expect(lastCodeEditorProps.instructions).toBe('Reverse the given array in place.');
    expect(lastCodeEditorProps.expectedOutput).toBe('[3,2,1]');
    expect(lastCodeEditorProps.hint).toBe('Use two pointers');
  });

  it('falls back per-field when coding_config only sets some fields', () => {
    const coding_config = { language: 'Python' }; // instructions/starterCode/hint left unset
    useCourseByIdMock.mockReturnValue({ course: courseWithLesson({ coding_config }), loading: false });
    render(<CodingExercisePage />);

    expect(lastCodeEditorProps.language).toBe('Python');
    expect(lastCodeEditorProps.starter).toBe('// Write your code here');
    expect(lastCodeEditorProps.instructions).toBe('Complete the coding exercise as described.');
  });
});
