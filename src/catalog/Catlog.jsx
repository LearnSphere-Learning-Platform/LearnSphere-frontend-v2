// import { Routes, Route } from "react-router-dom";
// // import Enrollment from "./catalog/Enrollment";
// // import CourseInfo from "./catalog/CourseInfo";
// // import CourseTabs from "./catalog/CourseTabs";
// // import CourseInstructor from "./catalog/CourseInstructor";
// import InstructorRouteWrapper from "./catalog/InstructorRouteWrapper";
// import { CourseCatalog } from "./catalog/CourseCatalog";
// import CoursePageWrapper from "./catalog/CoursePageWrapper"; // ⬅️ new component

// function Catlog() {
//   return (
//     // <div className="min-h-screen bg-gray-50 py-8">
//     //   <header className="h-15 flex items-center justify-center z-20 relative">
//     //     <h1 className="text-center font-bold text-3xl lg:text-5xl">HEADER</h1>
//     //   </header>

//     //   <main>
//     //     <Routes>
//     //       {/* Home route */}
//     //       <Route
//     //         path="/"
//     //         element={
//     //           <div className="max-w-8xl mx-auto px-4">
//     //             <Enrollment />
//     //             <CourseInfo courseData={selectedCourse} />
//     //             <CourseTabs courseData={selectedCourse} />
//     //             <CourseInstructor courseData={selectedCourse} />
//     //           </div>
//     //         }
//     //       />

//     //       <Route path="/instructor/:id" element={<InstructorRouteWrapper />} />
//     //     </Routes>
//     //   </main>
//     // </div>
//     // <CourseCatalog />
  
//     <Routes>
//       <Route path="/catalog" element={<CourseCatalog />} />
//       <Route path="/course/:id" element={<CoursePageWrapper />} />
//       <Route path="/instructor/:id" element={<InstructorRouteWrapper />} />
//     </Routes>
 

//   );
// }

// export default Catlog;