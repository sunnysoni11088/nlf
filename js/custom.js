$(document).ready(function() {
    // JavaScript to remove "show" class from collapsed navbar when a nav link is clicked
    $(".nav-link").on("click", function() {
        $(".navbar-collapse").removeClass("show");
        $(".navbar-toggler").removeClass("collapsed"); // Revert to the three-line burger menu
    });

    // Cache selectors
    var lastId,
        topMenu = $(".navbar-nav"),
        topMenuHeight = topMenu.outerHeight() + 1,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Check if any section is at least 50% visible in the viewport
        var visibleSectionId = null;
        var viewportHeight = $(window).height();
        var halfwayViewport = viewportHeight * 0.1;

        scrollItems.each(function() {
            var currItem = $(this);
            var offsetTop = currItem.offset().top;
            var height = currItem.outerHeight();

            if (offsetTop - fromTop <= halfwayViewport && offsetTop - fromTop + height > halfwayViewport) {
                visibleSectionId = currItem.attr("id");
            }
        });

        if (visibleSectionId) {
            if (lastId !== visibleSectionId) {
                lastId = visibleSectionId;
                // Set/remove active class
                menuItems
                    .parent().removeClass("active")
                    .end().filter("[href='#" + visibleSectionId + "']").parent().addClass("active");
            }
        }

        // Check if the "Contact" section is at least 25% from the bottom
        var contactSection = $("#contact");
        if (contactSection.length) {
            var contactOffset = contactSection.offset().top;
            var contactVisibleOffset = contactOffset - $(window).scrollTop();
            if (contactVisibleOffset < (viewportHeight * 0.75)) {
                // "Contact" section is at least 25% from the bottom
                menuItems
                    .parent().removeClass("active")
                    .end().filter("[href='#contact']").parent().addClass("active");
            }
        }
    });
});
