const btn = document.querySelector(".btn");
const sidebar = document.querySelector(".sidebar");
const sidebar_menu = document.querySelector(".sidebar__menu");

function handleMenu(e) {
	if (sidebar.classList.contains("is-clicked")) {
		sidebar_menu.classList.remove("is-close");
		sidebar_menu.classList.add("is-open");
		return;
	}
	sidebar_menu.classList.remove("is-open");
}

function btnHandle(e) {
	if (!sidebar.classList.contains("is-clicked")) {
		sidebar.classList.add("is-clicked");
		sidebar.addEventListener("transitionend", handleMenu);
		return;
	}
	sidebar_menu.classList.add("is-close");
	sidebar_menu.classList.remove("is-open");
	sidebar_menu.classList.remove("is-visible");
	sidebar.classList.remove("is-clicked");
}

btn.addEventListener("click", btnHandle);
