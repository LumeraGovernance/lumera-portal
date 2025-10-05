/* Course data & helpers (simple, editable) */
export const initialCourses = [{
  id: "getting-started",
  title: "Getting Started (Template)",
  category: "Onboarding",
  level: "Beginner",
  durationMinutes: 15,
  summary: "A blank template to demonstrate how to structure a course. Replace with your own content.",
  hero: "https://images.unsplash.com/photo-1523246191544-74961f7f9ab9?q=80&w=1600&auto=format&fit=crop",
  modules: [{
    id: "module-1",
    title: "Module 1 (Rename Me)",
    lessons: [{
      id: "lesson-1",
      title: "Lesson 1 (Write your content)",
      contentHTML: "<p>This is a placeholder lesson. Open Studio to edit.</p>"
    }]
  }]
}];

export function getCourses(){
  try{ const v = localStorage.getItem("lumera.courses"); if(v) return JSON.parse(v); }catch{}
  return initialCourses;
}
export function setCourses(list){
  localStorage.setItem("lumera.courses", JSON.stringify(list));
}

export function lessonKey(cId, mId, lId){ return `${cId}|${mId}|${lId}`; }
export function getProgress(courseId){
  try{ const v = localStorage.getItem(`lumera.progress.${courseId}`); if(v) return JSON.parse(v); }catch{}
  return { completed: {}, quiz:null };
}
export function setProgress(courseId, value){
  localStorage.setItem(`lumera.progress.${courseId}`, JSON.stringify(value));
}
export function markLessonComplete(courseId, moduleId, lessonId, val){
  const k = `lumera.progress.${courseId}`;
  const cur = getProgress(courseId);
  cur.completed[lessonKey(courseId, moduleId, lessonId)] = !!val;
  setProgress(courseId, cur);
}
export function progressPercent(progress, course){
  const total = course.modules.reduce((a,m)=>a+m.lessons.length,0);
  const done = Object.values(progress.completed||{}).filter(Boolean).length;
  return total ? Math.round((done/total)*100) : 0;
}