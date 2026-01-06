const skills = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress');
const percents=document.querySelectorAll('.percent');
const navItems = document.querySelectorAll(".sidebar li");
const sections = document.querySelectorAll("section");
progressBars.forEach(bar => {
  bar.style.width = "0%";
});

let animate = false;

const observer = new IntersectionObserver(entries => {
  const entry = entries[0];

  if (entry.isIntersecting && !animate) {
    skills.classList.add('show');
    animatebar();
    animate = true;
  }
}, { threshold: 0.5 });

observer.observe(skills);

function animatebar() {
  progressBars.forEach(bar => {
    bar.style.transition = "width 1.5s ease";
    bar.style.width = bar.dataset.width;
    animenumber();
  });
}
function animenumber(){
  percents.forEach((p,index)=>{
    let start=0;
    const end=parseInt(progressBars[index].dataset.width);
    const interval=setInterval(()=>{
      start++;
      p.textContent=start+"%";
      if(start==end){
        clearInterval(interval);
      }
    },15);
  });
}


navItems.forEach(item => {
  item.addEventListener("click", () => {
    const targetId = item.dataset.target;
    const section = document.getElementById(targetId);

    section.scrollIntoView({
      behavior: "smooth"
    });
  });
});
const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navItems.forEach(item => {
          item.classList.remove("active");

          if (item.dataset.target === id) {
            item.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.6
  }
);
sections.forEach(section => {
  sectionObserver.observe(section);
});
