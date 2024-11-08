/* Template Name: Muvico - Tailwind CSS Personal & Minimal Portfolio Template
   Author: Shreethemes
   Email: support@shreethemes.in
   Website: https://shreethemes.in
   Version: 1.0
   Created: September 2023
   File Description: Main JS file of the template
*/


/*********************************/
/*         INDEX                 */
/*================================
 *     01.  Loader               *
 *     02.  Toggle Menus         *
 *     03.  Active Menu          *
 *     04.  Clickable Menu       *
 *     05.  Menu Sticky          *
 *     06.  Back to top          *
 *     07.  Active Sidebar Menu  *
 *     08.  Feather icon         *
 *     09.  Contact JS           *
 *     10.  Light & Dark Theme   *
 *     11.  LTR & RTL Mode       *
 ================================*/

window.addEventListener('load', fn, false)

//  window.onload = function loader() {
function fn() {
    // Preloader
    if (document.getElementById('preloader')) {
        setTimeout(() => {
            document.getElementById('preloader').style.visibility = 'hidden';
            document.getElementById('preloader').style.opacity = '0';
        }, 350);
    }
    // Menus
    activateMenu();
}

//Menu
/*********************/
/* Toggle Menu */

/*********************/
function toggleMenu() {
    document.getElementById('isToggle').classList.toggle('open');
    var isOpen = document.getElementById('navigation')
    if (isOpen.style.display === "block") {
        isOpen.style.display = "none";
    } else {
        isOpen.style.display = "block";
    }
};
/*********************/
/*    Menu Active    */

/*********************/
function getClosest(elem, selector) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {
                }
                return i > -1;
            };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }
    return null;

};

function activateMenu() {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {

        var matchingMenuItem = null;
        for (var idx = 0; idx < menuItems.length; idx++) {
            if (menuItems[idx].href === window.location.href) {
                matchingMenuItem = menuItems[idx];
            }
        }

        if (matchingMenuItem) {
            matchingMenuItem.classList.add('active');


            var immediateParent = getClosest(matchingMenuItem, 'li');

            if (immediateParent) {
                immediateParent.classList.add('active');
            }

            var parent = getClosest(immediateParent, '.child-menu-item');
            if (parent) {
                parent.classList.add('active');
            }

            var parent = getClosest(parent || immediateParent, '.parent-menu-item');

            if (parent) {
                parent.classList.add('active');

                var parentMenuitem = parent.querySelector('.menu-item');
                if (parentMenuitem) {
                    parentMenuitem.classList.add('active');
                }

                var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            } else {
                var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            }
        }
    }
}

/*********************/
/*  Clickable manu   */
/*********************/
if (document.getElementById("navigation")) {
    var elements = document.getElementById("navigation").getElementsByTagName("a");
    for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].onclick = function (elem) {
            if (elem.target.getAttribute("href") === "javascript:void(0)") {
                var submenu = elem.target.nextElementSibling.nextElementSibling;
                submenu.classList.toggle('open');
            }
        }
    }
}
/*********************/
/*   Menu Sticky     */

/*********************/
function windowScroll() {
    const navbar = document.getElementById("topnav");
    if (navbar != null) {
        if (
            document.body.scrollTop >= 50 ||
            document.documentElement.scrollTop >= 50
        ) {
            navbar.classList.add("nav-sticky");
        } else {
            navbar.classList.remove("nav-sticky");
        }
    }
}

window.addEventListener('scroll', (ev) => {
    ev.preventDefault();
    windowScroll();
})
/*********************/
/*    Back To TOp    */
/*********************/
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    var mybutton = document.getElementById("back-to-top");
    if (mybutton != null) {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            mybutton.classList.add("flex");
            mybutton.classList.remove("hidden");
        } else {
            mybutton.classList.add("hidden");
            mybutton.classList.remove("flex");
        }
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/*********************/
/*  Active Sidebar   */
/*********************/
(function () {
    var current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    ;
    if (current === "") return;
    var menuItems = document.querySelectorAll('.sidebar-nav a');
    for (var i = 0, len = menuItems.length; i < len; i++) {
        if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
            menuItems[i].parentElement.className += " active";
        }
    }
})();

/*********************/
/*   Feather Icons   */
/*********************/
feather.replace();

/*********************/
/*     Contact Form  */
/*********************/
try {
    function validateForm() {
        var name = document.forms["myForm"]["name"].value;
        var email = document.forms["myForm"]["email"].value;
        var subject = document.forms["myForm"]["subject"].value;
        var comments = document.forms["myForm"]["comments"].value;
        document.getElementById("error-msg").style.opacity = 0;
        document.getElementById("simple-msg").innerHTML = "";

        // Client-side validation
        if (!name) {
            showError("*Please enter a Name*");
            return false;
        }
        if (!email) {
            showError("*Please enter an Email*");
            return false;
        }
        if (!subject) {
            showError("*Please enter a Subject*");
            return false;
        }
        if (!comments) {
            showError("*Please enter a Comment*");
            return false;
        }

        // Disable the submit button and show a loading indicator
        var submitButton = document.getElementById("submit");
        submitButton.disabled = true;
        submitButton.innerHTML = "Sending..."; // Optionally change the button text

        // AJAX request to send the form data to Django view
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                var response = JSON.parse(this.responseText);
                if (this.status === 200 && response.success) {
                    document.getElementById("simple-msg").innerHTML = "<div class='alert alert-success success_message'>" + response.success + "</div>";
                    document.forms["myForm"].reset();  // Clear form on success
                } else {
                    showError(response.error);
                }

                // Re-enable the submit button and restore text
                submitButton.disabled = false;
                submitButton.innerHTML = "Send Message"; // Reset the button text back to normal
            }
        };
        xhttp.open("POST", "/contact/", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("X-CSRFToken", getCSRFToken());  // Add CSRF token to header
        xhttp.send("name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&subject=" + encodeURIComponent(subject) + "&comments=" + encodeURIComponent(comments));
        return false;
    }

    function showError(message) {
        document.getElementById("error-msg").innerHTML = "<div class='alert alert-warning error_message'>" + message + "</div>";
        fadeIn();
    }

// Get CSRF token for AJAX request
    function getCSRFToken() {
        return document.querySelector('[name=csrfmiddlewaretoken]').value;
    }

// Fade in function
    function fadeIn() {
        var fade = document.getElementById("error-msg");
        var opacity = 0;
        var intervalID = setInterval(function () {
            if (opacity < 1) {
                opacity += 0.5;
                fade.style.opacity = opacity;
            } else {
                clearInterval(intervalID);
            }
        }, 200);
    }

} catch (error) {

}

/*********************/
/* Dark & Light Mode */
/*********************/
try {
    function changeTheme(e) {
        e.preventDefault()
        const htmlTag = document.getElementsByTagName("html")[0]

        if (htmlTag.className.includes("dark")) {
            htmlTag.className = 'light'
        } else {
            htmlTag.className = 'dark'
        }
    }

    const switcher = document.getElementById("theme-mode")
    switcher?.addEventListener("click", changeTheme)

    const chk = document.getElementById('chk');

    chk.addEventListener('change', changeTheme);
} catch (err) {

}

/*********************/
/* LTR & RTL Mode */
/*********************/
try {
    const htmlTag = document.getElementsByTagName("html")[0]

    function changeLayout(e) {
        e.preventDefault()
        const switcherRtl = document.getElementById("switchRtl")
        if (switcherRtl.innerText === "LTR") {
            htmlTag.dir = "ltr"
        } else {
            htmlTag.dir = "rtl"
        }

    }

    const switcherRtl = document.getElementById("switchRtl")
    switcherRtl?.addEventListener("click", changeLayout)
} catch (err) {
}