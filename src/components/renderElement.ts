export const renderElement = (
  child: string,
  className: string,
  parent?: HTMLElement,
  attr?: Record<string, string>
) => {
  if (attr && attr.id) {
    const current = document.getElementById(attr.id);

    if (current) {
      current.remove();
    }
  }

  const element = document.createElement(child) as HTMLElement;
  if (className) {
    element.className = className;
  }
  if (parent) {
    parent.append(element);
  }

  if (attr) {
    for (const key in attr) {
      if (key === 'innerText' || key === 'innerHTML') {
        element.innerText = attr[key];

        return element;
      }

      element.setAttribute(key, attr[key]);
    }
  }
  return element;
};
