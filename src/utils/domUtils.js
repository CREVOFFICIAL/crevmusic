function validator (data, title) {
  if (!data) {
    throw new Error(`${title}가 존재하지 않습니다.`);
  }
}

function findClosestParentWithClass (el, parentClass) {
  var currentParent = el.parentElement;

  while (currentParent) {
    if (currentParent.classList.contains(parentClass)) {
      return currentParent;
    } else {
      currentParent = currentParent.parentElement;
    }
  }

  return null;
}

function toggleClassList(el, className) {
  validator(el);

  if(el.classList.contains(className)) {
    el.classList.remove(className);
  } else {
    el.classList.add(className);
  }
}

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = 'block';
}

export {
  toggleClassList,
  findClosestParentWithClass,
  hide,
  show
};