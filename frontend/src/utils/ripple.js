export function createRipple(event) {
  const button = event.currentTarget;
  if (!button) return;

  const existingRipples = button.getElementsByClassName("ripple-span");
  for (let r of Array.from(existingRipples)) {
    r.remove();
  }

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const rect = button.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add("ripple-span");

  button.appendChild(circle);
}
