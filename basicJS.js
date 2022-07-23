var getCourseAPI = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourses);

  handlerCourse();
}
start();

function getCourses(callback) {
  fetch(getCourseAPI)
    .then((response) => response.json())
    .then(callback);
}

function createCourse(data) {
  let options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  fetch(getCourseAPI, options)
    .then((response) => response.json())
    .then();
}
function deleteCourse(id) {
  let options = {
    method: "DELETE",

    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  fetch(getCourseAPI + "/" + id, options)
    .then((response) => response.json())
    .then(() => {
      var courseItem = document.querySelector(".course-item-" + id);
      if (courseItem) {
        courseItem.remove();
      }
    });
}

function renderCourses(courses) {
  var listCoursesBlock = document.querySelector("#list-courses");

  let htmls = courses.map((course) => {
    return `
    <li class="course-display course-item-${course.id}">
      <div class="student__info">
        <img src="${course.photo}">
        <div class="student__heading">
          <h3>Tên SV: ${course.name}</h3>
          <p>MSSV: ${course.studentID}</p>
        </div>
      </div>
    <button onclick="deleteCourse(${course.id})">Xóa</button>
    <button class="btn-update-${course.id}" onclick="handlerUpdateCourse(${course.id})">Update</button>
    </li>
    `;
  });
  listCoursesBlock.innerHTML = htmls.join("");
}
getCourses();

function handlerCourse() {
  let createBtn = document.querySelector(".btn-create");
  createBtn.addEventListener("click", () => {
    let courseName = document.querySelector('input[name="name"]').value;
    let courseDes = document.querySelector('input[name="description"]').value;
    let imgURL = document.querySelector('input[name="img-url"]').value;

    let formData = {
      name: courseName,
      studentID: courseDes,
      photo: imgURL,
    };
    createCourse(formData);
  });
}
function updateCourse(id, data) {
  let options = {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(getCourseAPI + "/" + id, options)
    .then((response) => response.json())
    .then();
}

function handlerUpdateCourse(id) {
  let updateName = document.querySelector('input[name="name"]').value;
  let updateDes = document.querySelector('input[name="description"]').value;
  let updateImgURL = document.querySelector('input[name="img-url"]').value;
  let updateText = {
    name: updateName,
    studentID: updateDes,
    photo: updateImgURL,
  };

  updateCourse(id, updateText);
}
