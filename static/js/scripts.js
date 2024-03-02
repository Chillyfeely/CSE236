window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // Store the IDs of the page content divs for different buttons
    const pageContentIds = {
        'homeBtnx': 'homeContent', 
        'homeBtn': 'homeContent', 
        'homeBtn2': 'homeContent',
        'dashboardBtn': 'dashboardContent',
        'profileBtn': 'profileContent',
        'profileBtn2': 'profileContent',
        // ...add more here...
    };

    // Add event listeners to the sidebar links
    for (let linkId in pageContentIds) {
        const link = document.body.querySelector('#' + linkId);
        if (link) {
            link.addEventListener('click', event => {
                event.preventDefault();
                // Hide all page content divs
                for (let contentId in pageContentIds) {
                    const contentDiv = document.body.querySelector('#' + pageContentIds[contentId]);
                    if (contentDiv) {
                        contentDiv.style.display = 'none';
                    }
                }
                // Show the page content div for the clicked link
                const contentDiv = document.body.querySelector('#' + pageContentIds[linkId]);
                if (contentDiv) {
                    contentDiv.style.display = 'block';
                }
            });
        }
    }

    // Show the page content div for 'homeBtnx' when the page loads
    const homeContentDiv = document.body.querySelector('#' + pageContentIds['homeBtnx']);
    if (homeContentDiv) {
        homeContentDiv.style.display = 'block';
    }

});