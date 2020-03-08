$(document).ready(function() {
    let teachersTable = $("#teachersTable").DataTable({
        ajax: {
            url: "api/teacher",
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'name' },
            {
                data: null,
                render: function(data, type, row) {
                    return '<td><button class="delete" teacherId="' + data.id + '">Delete</button></td>';
                }
            }
        ]

    });

    //to delete a row (from the frontend):
    $("#teachersTable").on('click', 'button.delete', function() {
        let teacherId = $(this).attr('teacherId');
        deleteTeacher(teacherId);
        teachersTable.row($(this).parents('tr')).remove().draw();
    });

    //to delete the teacher from the backend:
    function deleteTeacher(teacherId) {
        $.ajax({
            url: 'api/teacher/' + teacherId,
            type: 'DELETE',
            success: function() {
                alert('deleted');
            },
            error: function() {
                alert('not deleted');
            }
        });
    }

    $("#reloadButton").click(function() {
        teachersTable.ajax.reload();
    });

});


// $("#movieTable").on('click', 'button', function () {
//     movieTable.row($(this).parents('tr'))
//         .remove()
//         .draw();
// });