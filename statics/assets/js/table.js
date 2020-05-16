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

                if(res.status == true)
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
            let tr_eq = $(e.target).parent().parent().parent().index()

            tr_eq++ // I don't know why if I delete the 0 at the very first time, there's no effect like something else deleted

            console.log(tr_eq)

            $.ajax({
                url: config.hostname + "/admin/api/delete-member",
                method: "POST",
                dataType: "JSON",
                data: {
                    member_id: member_id
                }
            }).done((res) => {

                if(res.status == true) {

                    $(".DTFC_LeftBodyWrapper").find("tr").eq(tr_eq).remove()
                    $(".DTFC_RightBodyWrapper").find("tr").eq(tr_eq).remove()
                    $(".dataTables_scrollBody").find("tr").eq(tr_eq).remove()

                } else
                    alert("Fail deleting member!")

            }).fail((e) => {

                alert("Fail deleting member! " + JSON.stringify(e))
            })
        })

        $('.remove-from-family').click((e) => {

            let member_id = $(e.target).parent().parent().attr('member-id')
            let tr_eq = $(e.target).parent().parent().parent().index()

            tr_eq++ // I don't know why if I delete the 0 at the very first time, there's no effect like something else deleted

            // find parent tr
            let parent_tr = $(e.target).parent().parent().parent()
            let parent_tr_eq = $(e.target).parent().parent().parent().index() + 1

            while(parent_tr.css("background-color") != "bisque" && parent_tr.index() != 0) {

                parent_tr = parent_tr.prev()
                parent_tr_eq--
            }

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

                    // change buttons
                    $(".DTFC_RightBodyWrapper").find("tr").eq(tr_eq).find("td").eq(0).html('<span><button class="btn btn-danger delete-member">Hapus</button></span><span><button class="btn btn-primary add-member">Tambah istri/anak</button></span>')
                    $(".DTFC_LeftBodyWrapper").find("tr").eq(add_member_candidate_eq).height($(".DTFC_RightBodyWrapper").find("tr").eq(add_member_candidate_eq).height())
                    $(".dataTables_scrollBody").find("tr").eq(add_member_candidate_eq).height($(".DTFC_RightBodyWrapper").find("tr").eq(add_member_candidate_eq).height())

                    $(".DTFC_LeftBodyWrapper").find("tr").eq(tr_eq).css("background-color", "bisque")
                    $(".DTFC_RightBodyWrapper").find("tr").eq(tr_eq).css("background-color", "bisque")
                    $(".dataTables_scrollBody").find("tr").eq(tr_eq).css("background-color", "bisque")

                    $(".DTFC_LeftBodyWrapper").find("tr").eq(tr_eq).insertBefore($(".DTFC_LeftBodyWrapper").find("tr").eq(parent_tr_eq))
                    $(".DTFC_RightBodyWrapper").find("tr").eq(tr_eq).insertBefore($(".DTFC_RightBodyWrapper").find("tr").eq(parent_tr_eq))
                    $(".dataTables_scrollBody").find("tr").eq(tr_eq).insertBefore($(".dataTables_scrollBody").find("tr").eq(parent_tr_eq))

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

                    // OK I also dont understand why if i dont put these 3 lines, the other 3 lines below wont work (auto color)
                    $(".DTFC_LeftBodyWrapper").find("tr").eq(add_member_candidate_eq).css("background-color", "white")
                    $(".DTFC_RightBodyWrapper").find("tr").eq(add_member_candidate_eq).css("background-color", "white")
                    $(".dataTables_scrollBody").find("tr").eq(add_member_candidate_eq).css("background-color", "white")

                    $(".DTFC_LeftBodyWrapper").find("tr").eq(add_member_candidate_eq).css("background-color", "auto!important")
                    $(".DTFC_RightBodyWrapper").find("tr").eq(add_member_candidate_eq).css("background-color", "auto!important")
                    $(".dataTables_scrollBody").find("tr").eq(add_member_candidate_eq).css("background-color", "auto!important")

                    // change buttons
                    $(".DTFC_RightBodyWrapper").find("tr").eq(add_member_candidate_eq).find("td").html('<span><button class="btn btn-danger delete-member">Hapus</button></span><span><button class="btn btn-warning remove-from-family">Hapus dari KK</button></span>')
                    $(".DTFC_LeftBodyWrapper").find("tr").eq(add_member_candidate_eq).height($(".DTFC_RightBodyWrapper").find("tr").eq(add_member_candidate_eq).height())
                    $(".dataTables_scrollBody").find("tr").eq(add_member_candidate_eq).height($(".DTFC_RightBodyWrapper").find("tr").eq(add_member_candidate_eq).height())

                    $(".DTFC_LeftBodyWrapper").find("tr").eq(add_member_candidate_eq).insertAfter($(".DTFC_LeftBodyWrapper").find("tr").eq(add_member_parent_eq))
                    $(".DTFC_RightBodyWrapper").find("tr").eq(add_member_candidate_eq).insertAfter($(".DTFC_RightBodyWrapper").find("tr").eq(add_member_parent_eq))
                    $(".dataTables_scrollBody").find("tr").eq(add_member_candidate_eq).insertAfter($(".dataTables_scrollBody").find("tr").eq(add_member_parent_eq))

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