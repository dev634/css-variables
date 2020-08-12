const btn = document.querySelector(".btn");
const sidebar = document.querySelector(".sidebar");
const sidebar_menu = document.querySelector(".sidebar__menu");
const sidebar_header = document.querySelector(".sidebar__header");
const menu_items = document.querySelectorAll(".sidebar__menu-item");
const color_picker = document.querySelectorAll('input[type="color"]');
const range_input = document.querySelectorAll('input[type="range"]');

function handleChange(e) {
	document.documentElement.style.setProperty("--wrapper-bg", e.target.value);
}

function handleMouseMove(e) {
	document.documentElement.style.setProperty("--wrapper-bg", e.target.value);
}

function listenMouseMove(elmt) {
	elmt.addEventListener("mousemove", handleMouseMove);
}

function listenChange(elmt) {
	elmt.addEventListener("change", handleChange);
}

function handelFirstLevelItems(e) {
	const item = document.querySelector(
		`.sidebar__menu-item[data-key="${this.dataset.key}"]`
	);
	if (!item.childNodes[1].classList.contains("is-collapsed")) {
		item.childNodes[1].classList.add("is-collapsed");
		return;
	}

	item.childNodes[1].classList.remove("is-collapsed");
}

function handleItems(elmt) {
	elmt.addEventListener("click", handelFirstLevelItems);
}

function handleMenu(e) {
	if (sidebar.classList.contains("is-clicked")) {
		sidebar_menu.classList.remove("is-close");
		sidebar_menu.classList.add("is-open");
		return;
	}
	sidebar_menu.classList.remove("is-open");
}

function btnHandle(e) {
	const wrapper = document.querySelector(".content-wrapper");
	if (!sidebar.classList.contains("is-clicked")) {
		wrapper.style.width = "calc(80% - 17px)";
		sidebar.classList.add("is-clicked");
		sidebar.addEventListener("transitionend", handleMenu);
		sidebar_header.style.backgroundColor = "rgba(10, 10, 10, 0.75)";
		return;
	}
	wrapper.removeAttribute("style");
	sidebar_header.style.backgroundColor = "transparent";
	sidebar_menu.classList.add("is-close");
	sidebar_menu.classList.remove("is-open");
	sidebar_menu.classList.remove("is-visible");
	sidebar.classList.remove("is-clicked");
}

menu_items.forEach(handleItems);

btn.addEventListener("click", btnHandle);
color_picker.forEach(listenChange);
color_picker.forEach(listenMouseMove);
