$(document).ready(() => {

    let add_member_parent_id, add_member_parent_eq, add_member_candidate_id, add_member_candidate_eq

    function initCellUpdateFunctions() {
            
        $("table input").focusout((e) => {

            $.ajax({
                method: 'POST',
                data: {
                    member_id: $(e.target).attr('member-id'),
                    member_meta_index_id: $(e.target).attr("member-meta-index-id"),
                    value: $(e.target).val()
                },
                url: config.hostname + '/admin/api/update-cell'

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

    function initMemberButtonActionsFunctions() {
        
        $('.delete-member').click((e) => {

            let member_id = $(e.target).parent().parent().attr('member-id')
            let tr_index = $(e.target).parent().parent().parent().index()

            tr_index++ // I don't know why if I delete the 0 at the very first time, there's no effect like something else deleted

            console.log(tr_index)

            $.ajax({
                url: config.hostname + "/admin/api/delete-member",
                method: "POST",
                dataType: "JSON",
                data: {
                    member_id: member_id
                }
            }).done((res) => {

                if(res.status == true) {

                    $(".DTFC_LeftBodyWrapper").find("tr").eq(tr_index).remove()
                    $(".DTFC_RightBodyWrapper").find("tr").eq(tr_index).remove()
                    $(".dataTables_scrollBody").find("tr").eq(tr_index).remove()

                } else
                    alert("Fail deleting member!")

            }).fail((e) => {

                alert("Fail deleting member! " + JSON.stringify(e))
            })
        })

        $('.remove-from-family').click((e) => {

            let member_id = $(e.target).parent().parent().attr('member-id')
            let tr_index = $(e.target).parent().parent().parent().index()

            tr_index++ // I don't know why if I delete the 0 at the very first time, there's no effect like something else deleted

            $.ajax({
                url: config.hostname + "/admin/api/remove-from-family",
                method: "POST",
                dataType: "JSON",
                data: {
                    member_id: member_id
                }
            }).done((res) => {

                if(res.status == true) {

                    console.log("Success remove from family");

                    $(".DTFC_LeftBodyWrapper").find("tr").eq(tr_index).insertAfter($(".DTFC_LeftBodyWrapper").find("tr").eq(tr_index).prev())
                    $(".DTFC_RightBodyWrapper").find("tr").eq(tr_index).insertAfter($(".DTFC_LeftBodyWrapper").find("tr").eq(tr_index).prev())
                    $(".dataTables_scrollBody").find("tr").eq(tr_index).insertAfter($(".DTFC_LeftBodyWrapper").find("tr").eq(tr_index).prev())

                } else
                    console.log("Failed remove from family");
            }).fail((e) => {

                console.log("Failed network remove from family. " + e);
            })
        })

        $('.add-member').click((e) => {

            $("#selected-parent-will-add").html("Menjadi anggota keluarga " + $(".DTFC_LeftBodyWrapper").find("tr").eq($(e.target).parent().parent().parent().index()+1).children().eq(0).find('input').val())
            add_member_parent_id = $(".DTFC_LeftBodyWrapper").find("tr").eq($(e.target).parent().parent().parent().index()+1).children().eq(0).find('input').attr('member-id')
            add_member_parent_eq = $(e.target).parent().parent().parent().index()+1
        })
    }

    function initAddMemberToFamilyFunctions() {

        $('#add-member-to-family-search').keyup(() => {

            $('#add-member-to-family-search-result').html("")

            if($('#add-member-to-family-search').val() != "")
                $(".dataTables_scrollBody").find("tbody").children().each((k, e) => {

                    let name = $(e).children().eq(0).find('input').val()
                    let candidate_id = $(e).children().eq(0).find('input').attr('member-id')
                    let candidate_eq = k+1

                    if(name.toLowerCase().search($('#add-member-to-family-search').val().toLowerCase()) != -1)
                        $("#add-member-to-family-search-result").append("<li candidate-eq=" + candidate_eq + " candidate-id=" + candidate_id + ">" + name + "</li>")
                })

            $("#add-member-to-family-search-result li").click((e) => {

                $('#add-member-to-family-search-result').html("")

                add_member_candidate_id = $(e.target).attr('candidate-id')
                add_member_candidate_eq = $(e.target).attr('candidate-eq')

                $("#selected-member-to-be-added").html($(e.target).html())
            })
        })

        $('#add-member-submit').click(() => {

            console.log(add_member_parent_id);
            console.log(add_member_candidate_id);
            
            $.ajax({
                url: config.hostname + "/admin/api/add-family-member",
                method: "POST",
                dataType: "JSON",
                data: {
                    parent_id: add_member_parent_id,
                    candidate_id: add_member_candidate_id,
                    family_status: $("#add-member-family-status").val()
                }
            }).done((res) => {

                if(res.status == true) {

                    alert("Nehasil")

                    $(".DTFC_LeftBodyWrapper").find("tr").eq(add_member_candidate_eq).insertAfter($(".DTFC_LeftBodyWrapper").find("tr").eq(add_member_parent_eq))
                    $(".DTFC_RightBodyWrapper").find("tr").eq(add_member_candidate_eq).insertAfter($(".DTFC_LeftBodyWrapper").find("tr").eq(add_member_parent_eq))
                    $(".dataTables_scrollBody").find("tr").eq(add_member_candidate_eq).insertAfter($(".DTFC_LeftBodyWrapper").find("tr").eq(add_member_parent_eq))

                } else
                    alert("Gagal")

            }).fail((e) => {

                alert("Fail adding member. " + JSON.stringify(e))
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
            initMemberButtonActionsFunctions()
            initAddMemberToFamilyFunctions()
        }
    })
})