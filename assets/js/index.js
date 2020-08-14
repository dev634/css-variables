window.addEventListener("load", init);

const btn = document.querySelector(".btn");
const sidebar = document.querySelector(".sidebar");
const sidebar_menu = document.querySelector(".sidebar__menu");
const sidebar_header = document.querySelector(".sidebar__header");
const menu_items = document.querySelectorAll(".sidebar__menu-item");
const color_picker = document.querySelectorAll('input[type="color"]');
const range_input = document.querySelectorAll('input[type="range"]');
const header_image = document.querySelector("input[name='header-img']");
const header_title = document.querySelector("input[name='heading-title']");
const header_slogan = document.querySelector("input[name='heading-slogan']");
const layer_color = document.querySelector("input[name='layer-color']");
const layer_opacity = document.querySelector("input[name='layer-opacity']");
const labels = document.querySelectorAll("label");

function init(e) {
	e.preventDefault();
	const background = document.querySelector("input[name='wrapper-bg']");
	const wrapper_pd = document.querySelector("input[name='wrapper-pd']");
	const wrapper_height = document.querySelector(
		"input[name='wrapper-height']"
	);
	document.documentElement.style.setProperty(
		"--wrapper-bg",
		background.value
	);
	document.documentElement.style.setProperty(
		"--wrapper-pd",
		wrapper_pd.value + "rem"
	);
	document.documentElement.style.setProperty(
		"--wrapper-height",
		wrapper_height.value + "px"
	);
	document.documentElement.style.setProperty(
		"--heading-title",
		header_title.value + "rem"
	);
	document.documentElement.style.setProperty(
		"--heading-slogan",
		header_slogan.value + "rem"
	);
	document.documentElement.style.setProperty(
		"--layer-color",
		layer_color.value
	);
	document.documentElement.style.setProperty(
		"--layer-opacity",
		layer_opacity.value
	);
}

function handleEvent(e) {
	switch (e.type) {
		case "click":
			console.log("i am clicked");
			break;
		default:
			break;
	}
}

function handleFiles(e) {
	let tgt = e.target.files[0];
	if (FileReader && tgt && e.target.files.length) {
		let fr = new FileReader();
		fr.onload = function () {
			document.documentElement.style.setProperty(
				"--header-bg",
				`url('${fr.result}')`
			);
		};
		fr.readAsDataURL(tgt);
	}
}

function handleChange(e) {
	if (this.dataset.sizing) {
		document.documentElement.style.setProperty(
			`--${this.name}`,
			e.target.value + this.dataset.sizing
		);
		return;
	}
	document.documentElement.style.setProperty(
		`--${this.name}`,
		e.target.value
	);
}

function handleInput(e) {
	if (this.dataset.sizing) {
		document.documentElement.style.setProperty(
			`--${this.name}`,
			e.target.value + this.dataset.sizing
		);
		return;
	}
	document.documentElement.style.setProperty(
		`--${this.name}`,
		e.target.value
	);
}

function listenInput(elmt) {
	elmt.addEventListener("click", function (e) {
		e.stopPropagation();
	});
	elmt.addEventListener("input", handleInput);
}

function listenChange(elmt) {
	elmt.addEventListener("click", function (e) {
		e.stopPropagation();
	});
	elmt.addEventListener("change", handleChange);
}

function listenMouseMove(elmt) {
	elmt.addEventListener("mousemove", handleMouseMove);
}

function handelFirstLevelItems(e) {
	this.childNodes[1].classList.toggle("is-collapsed");
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
}

function btnHandle(e) {
	const wrapper = document.querySelector(".content-wrapper");
	if (!sidebar.classList.contains("is-clicked")) {
		sidebar.classList.add("is-clicked");
		sidebar.addEventListener("transitionend", handleMenu);
		sidebar_header.style.backgroundColor = "rgba(10, 10, 10, 0.75)";
		wrapper.classList.add("is-reduce");
		return;
	}
	sidebar_header.style.backgroundColor = "transparent";
	sidebar_menu.classList.add("is-close");
	sidebar_menu.classList.remove("is-open");
	sidebar_menu.classList.remove("is-visible");
	wrapper.classList.remove("is-reduce");
	sidebar.classList.remove("is-clicked");
}

menu_items.forEach(handleItems);
btn.addEventListener("click", btnHandle);
color_picker.forEach(listenChange);
color_picker.forEach(listenInput);

range_input.forEach(listenInput);
range_input.forEach(listenChange);

header_image.addEventListener("click", function (e) {
	e.stopPropagation();
	e.target.addEventListener("input", handleFiles);
});

labels.forEach(elmt => {
	elmt.addEventListener("click", function (e) {
		e.stopPropagation();
	});
});
