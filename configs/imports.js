const links = document.querySelectorAll('link[rel="import"]');

Array.prototype.forEach.call(links, link => {
  let template = link.import.querySelector(".task-template");
  let clone = document.importNode(template.content, true);

  if (link.href.match("mega_senaa.html")) {
    document.querySelector("body").appendChild(clone);
  } else {
    document.querySelector(".content").appendChild(clone);
  }
});
