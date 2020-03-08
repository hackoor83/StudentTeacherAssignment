$(document).ready(function() {
    $("#getTeachers").click(getTeachers);
    $("#getCourses").click(getCourses);
    $("#addTeacherButton").click(addTeacher);
    $("#addCourseButton").click(addCourse);
    listTeachersDropMenu();
});

//To add teacher to the db:
function addTeacher() {
    let newTeacher = {
        name: $("#addTeacherInput").val()
    }

    let jsonObject = JSON.stringify(newTeacher);

    $.ajax({
        url: 'api/teacher',
        type: 'POST',
        contentType: 'application/json',
        data: jsonObject,
        success: function() {
            alert('Teacher added to db');
        },
        error: function() {
            alert('ERROR');
        }
    });
}


//To list teachers in the table
function getTeachers() {
    $.get('api/teacher', function(teachers) {
        console.log(teachers);
        $("#getTeachersTableBody").empty();
        $.each(teachers, function(index, teacher) {
            $("#getTeachersTableBody").append(
                '<tr id="row' + teacher.id + '"class="table-active"><td>' + teacher.id + '</td>' +
                '<td><input class="form-control" id="inputRow' + teacher.id + '" type="text" disabled="' + true + '"  placeholder="' + teacher.name + ' "></td>' +
                '<td><button class="btn btn-danger" onclick="deleteTeacher(' + teacher.id + ')">Delete</button>' +
                '<button class= "btn btn-outline-danger" onclick="editTeacher(' + teacher.id + ')">Edit</button></td></tr>'
            );
        });
    });
}

//To activate teacher name editing:
function editTeacher(teacherId) {
    console.log('the id is: ' + teacherId);
    $("#inputRow" + teacherId).attr("disabled", false);
    // $("#inputRow" + teacherId).after('<button id="editConfirmButton" class="btn btn-primary btn-sm" onclick="confirmEdit(' + teacherId + ',' + newInputValue + ')">Confirm</button>');
    $("#inputRow" + teacherId).after('<button id="editConfirmButton" class="btn btn-primary btn-sm" onclick="confirmEdit(' + teacherId + ')">Confirm</button>');

}

//to edit and confirm teacher name edit
function confirmEdit(id) {
    let newInputValue = $("#inputRow" + id).val();
    console.log('the new input value is: ' + newInputValue);
    console.log('the id in confirmEdit is: ' + id);
    console.log('the new input value in confirmEdit is: ' + newInputValue);

    let teacherNameEdited = {
        id: id,
        name: newInputValue
    }

    let jsonObject = JSON.stringify(teacherNameEdited);

    $.ajax({
        url: 'api/teacher/update/' + id,
        type: 'PUT',
        contentType: 'application/json',
        data: jsonObject,
        success: function() {
            alert('Teacher name updated');
            $("#editConfirmButton").hide();
            $("#inputRow" + id).attr("disabled", true);

        },
        error: function() {
            alert('ERROR: Not updated');
        }
    });
}

//To remove a teacher from the list
function deleteTeacher(id) {
    $.ajax({
        url: "api/teacher/" + id,
        type: "DELETE",
        success: function() {
            $("#row" + id).remove();
            alert('Teacher removed from the List successfully');
        },
        error: function() {
            alert('Teacher is stubborn and not willing to move away!!');
        }
    });
}


//To list the courses in the table
function getCourses() {
    $.get('api/course', function(courses) {
        $("#getCoursesTableBody").empty();
        $.each(courses, function(index, course) {
            $("#getCoursesTableBody").append(
                '<tr id="row' + course.id + '" class="table-active"><td>' + course.id + '</td>' +
                '<td>' + course.name + '</td>' +
                '<td>' + (course.teacher ? course.teacher.name : 'No teacher') + '</td>' +
                '<td><button class="btn btn-danger" onclick="deleteCourse(' + course.id + ')">Delete</button></td></tr>'
            );
            console.log(JSON.stringify(course.teacher));
        });
    });
}

function deleteCourse(courseId) {
    $.ajax({
        url: 'api/course/delete/' + courseId,
        type: "DELETE",
        success: function() {
            $("#row" + courseId).remove();
            alert('Course removed from the list successfully');
        },
        error: function() {
            alert('Course removal failed!!');
        }
    });
}

//To add course:
function addCourse() {
    console.log($("#assignTeacherList option:selected").text());
    let newCourse = {
        name: $("#addCourseInput").val(),
        // teacher: $("#assignTeacherList option:selected").val()
        teacher: { id: $("#assignTeacherList").val() }
    }

    let jsonObject = JSON.stringify(newCourse);
    console.log(jsonObject);

    $.ajax({
        url: "api/course",
        type: "POST",
        contentType: "application/json",
        data: jsonObject,
        success: function() {
            alert("Course added successfully!");
        },
        error: function() {
            alert("ERROR!");
        }
    });
}

//To list teachers in add course form
// let teacherName = "";
function listTeachersDropMenu() {
    $.get('api/teacher', function(teachers) {
        $.each(teachers, function(index, teacher) {
            $("#assignTeacherList").append(
                new Option(teacher.name, teacher.id)
            );
        });
    });
}