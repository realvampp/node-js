$(document).ready(function () {

    (function () {
        let data = {
            filter: getParameterByName('filter') || 'name',
            page: getParameterByName('page') || 1
        };

        fillTable(data)
    }());


    $('#logout').click(function (e) {
        doAjaxQuery('GET', '/admin/api/v1/login', {action: 'logout'}, () => {
            window.location = '/'
        })
        e.preventDefault()
    })

    $('#addBook').on('submit', (e) => {
        let formData = new FormData($('#addBook')[0]);
        console.log(formData)

        // let hasAuthor = false;
        // let formDataEntries = formData.entries()
        // for (let entry of formDataEntries) {
        //     let key = entry[0]
        //     // let value = entry[1]
        //     // console.log(key, value)
        //     // if (key == 'author' && value)
        //     //     hasAuthor = true
        //     // if (!value && !hasAuthor)
        //     //     console.log('not value', key)
        //     console.log(formData.getAll(key))
        // }


        $.ajax({
            url: '/admin/api/v1/upload',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(res) {
                if (!res.success) {
                    view.showError(res.msg);
                    return;
                }
                view.showSuccess('Книга успешно добавлена!')
            },
            error: function(jqXHR, textStatus, res) {
                console.log('inAjaxError', res)
                view.showError('Ошибка ' + textStatus);
            }
        })

        e.preventDefault()
    })

    $('#addBook input[type="file"]').change(function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                $('#imagePreview').attr('src', e.target.result);
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    $('.pagination').on('click', '.page-item', function (e) {
        let link = $(this).find('a')
        let page = link.attr('data-page-number')

        if (link.hasClass('disabled'))
            return

        fillTable({page, filter: 'name'})

        e.preventDefault()
    })
});

function fillTable(data) {
    doAjaxQuery('GET', 'admin/api/v1/books', data, function (res) {
        console.log('ajaxAdmin', res)
        view.addBooksList(res)
        view.initPagination(res.data.total.pages, res.data.page)
        changeHistory(res.data.filter, res.data.page)
        // $('.pagination').pagination({
        //     items: 20,
        //     itemOnPage: 8,
        //     currentPage: 1,
        //     cssStyle: '',
        //     prevText: '<span aria-hidden="true">&laquo;</span>',
        //     nextText: '<span aria-hidden="true">&raquo;</span>',
        //     onInit: function () {
        //         // fire first page loading
        //     },
        //     onPageClick: function (page, evt) {
        //         // some code
        //     }
        // });
    });
}

function changeHistory(filter, page) {
    let queryString = '?filter=' + filter + '&page=' + page;
    window.history.replaceState('', '', queryString);
}