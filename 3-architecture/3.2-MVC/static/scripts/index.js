var drawItemsOnScroll,
    isScrollRunning = false;

// console.log(isScrollRunning);

$(document).ready(function () {

    (function () {
        let data = {
            filter: getParameterByName('filter') || global.filter,
            offset: getParameterByName('offset'),
            limit: getParameterByName('count') || global.items_limit_on_page_load
        };

        setSidebarActiveButton(null, data.filter);
        doAjaxQuery('GET', '/api/v1/books', data, function (res) {
            view.addBooksItems(res.data.books, true);
            drawItemsOnScroll = initDrawItemsOnScroll(res.data.total.amount);
            if (localStorage.getItem('h')) {
                $(window).scrollTop(localStorage.getItem('h'));
                localStorage.removeItem('h');
            }
        });
    }());

    $('#content').on('click', '.book', function () {
        localStorage.setItem('h', $(window).scrollTop());
    });

    $(document).scroll(function () {
        if ((( $(document).height() - $(window).scrollTop() ) < ( 2 * $(window).height() )) && !isScrollRunning) {
            isScrollRunning = true;
            drawItemsOnScroll();
        }
    });
});

var initDrawItemsOnScroll = function (maxItems) {

    var maxNumOfItems = maxItems,
        limit = global.number_of_items_onscroll,
        offset = parseInt(getParameterByName('count')) || global.items_limit_on_page_load;
    // console.log('drawScroll limit and offset',limit, offset)

    return function () {
        if (offset < maxNumOfItems) {
            var data = {
                'filter': getParameterByName('filter') || global.filter,
                'offset': offset,
                'limit': limit
            };
            $("#loading").slideDown();

            doAjaxQuery('GET', '/api/v1/books', data,
                function (res) {
                    $("#loading").slideUp();
                    isScrollRunning = false;
                    // console.log('Myres', res.data)

                    view.addBooksItems(res.data.books, false);
                    changeHistoryStateWithParams("replace", res.data.filter, res.data.offset);
                });

            offset += limit;
        }
    }
};

function loadIndexPage(reqData) {
    doAjaxQuery('GET', '/api/v1/books', reqData, function (res) {
        view.addBooksItems(res.data.books, true);
        changeHistoryStateWithParams('push', res.data.filter, res.data.offset);
        drawItemsOnScroll = initDrawItemsOnScroll(res.data.total.amount);
    });
}

function setSidebarActiveButton(activeElem, filterStringValue) {
    $('.sidebar_item').removeClass('active');
    if (activeElem) {
        activeElem.closest('a').addClass('active');
        return;
    } else {
        $('a[data-filter=' + filterStringValue + ']').addClass('active');
    }
}
