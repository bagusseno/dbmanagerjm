$(document).ready(() => {
    
    function complete() {

        $(".paginate_button").click(() => {
            
            initCellUpdateFunctions()
            initMemberDeletionFunctions()
            complete()
        })
    }

    function initCellUpdateFunctions() {
            
        $("table input").focusout((e) => {

            $.ajax({

                method: 'POST',
                data: {
                    member_id: $(e.target).attr('member-id'),
                    member_meta_index_id: $(e.target).attr("member-meta-index-id"),
                    value: $(e.target).val()
                },
                url: 'http://localhost:313/admin/api/update-cell'

            }).done((res) => {

                if(res == "success")
                    console.log("Success update");
                else
                    console.log("Failed update");
            }).fail(() => {

                console.log("Error network");
            })
        })

        let enter_fired = false
        $("table input").keydown((e) => {

            if(e.repeat) return

            if(e.which == 13 && !enter_fired) {

                enter_fired = true
                $(e.target).blur()
            }
        })

        $("table input").keyup((e) => {

            enter_fired = false
        })

    }   

    function initMemberDeletionFunctions() {

        $(".delete-member").click((e) => {

            alert("A")

            let member_id = $(e.target).parent().parent().attr('member-id')
            alert(member_id)
            let row_html = $(e.target).parent().parent().parent()

            $.ajax({
                url: "http://localhost:313/admin/api/delete-member",
                method: "POST",
                dataType: "JSON",
                data: {
                    member_id: member_id
                }
            }).done((res) => {

                // res = JSON.parse(res);

                if(res.status == true)
                    $("table").DataTable().row(row_html).remove()
                else
                    alert("Fail deleting member!")

            }).fail((e) => {

                alert("Fail deleting member! " + JSON.stringify(e))
            })
        })
    }

    let memberTable = $("table").DataTable({
        scrollX: true,
        scrollY: "50vh",
        scrollCollapse: true,
        ordering: false,
        paging: false,
        fixedColumns: {
            leftColumns: 1,
            rightColumns: 1
        },
        initComplete: function(settings, json) {

            initCellUpdateFunctions()
            initMemberDeletionFunctions()
            setTimeout(complete, 500)
        }
    })
})