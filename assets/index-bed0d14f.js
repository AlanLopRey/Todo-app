(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))r(c);new MutationObserver(c=>{for(const n of c)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function t(c){const n={};return c.integrity&&(n.integrity=c.integrity),c.referrerPolicy&&(n.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?n.credentials="include":c.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(c){if(c.ep)return;c.ep=!0;const n=t(c);fetch(c.href,n)}})();const a="/Todo-app/assets/icon-cross-37f00ffb.svg";//!7-t permitir que las tareas se guarden en el localstorage
const m=document.querySelector(".form"),i=document.querySelector(".todos"),l=document.querySelector(".form__input"),f=document.querySelector("#clear-completed"),p=document.querySelector(".todo-actions__spn--p"),h=document.querySelector("#all"),v=document.querySelector("#active"),y=document.querySelector("#completed");function k(o){const e=`
    <div class="todo">
      <div class="todo-wrapper">
        <input
          class="todo-checkbox"
          type="checkbox"
          name="todo-check"
          id="checkbox"
        />
        <p class="todo__p">${o}</p>
      </div>
      <img
        src="${a}"
        alt="delete a todo"
        class="delete-todo"
      />
    </div>
  `,t=document.createElement("div");return t.innerHTML=e,t}function b(){m.addEventListener("submit",o=>{o.preventDefault();const e=l.value.trim();if(e!==""){const t=k(e);i.appendChild(t),l.value="",g(t),s()}})}function u(o){o.remove(),s()}i.addEventListener("click",o=>{if(o.target.classList.contains("delete-todo")){const e=o.target.closest(".todo");e&&u(e)}});function g(o){const e=o.querySelector(".todo-checkbox"),t=o.querySelector(".todo__p");e.addEventListener("change",()=>{t.classList.toggle("checked-active",e.checked),s()})}function s(){const o=document.querySelectorAll(".todo-checkbox").length,e=document.querySelectorAll(".todo-checkbox:checked").length,t=o-e;p.textContent=t}f.addEventListener("click",()=>{document.querySelectorAll(".todo-checkbox:checked").forEach(e=>{const t=e.closest(".todo");t&&u(t)})});function E(){document.querySelectorAll("#checkbox").forEach(e=>{const t=e.closest(".todo");e.checked?t.classList.add("active-sect"):t.classList.remove("active-sect")})}function L(){document.querySelectorAll("#checkbox").forEach(e=>{const t=e.closest(".todo");e.checked?t.classList.remove("active-sect"):t.classList.add("active-sect")})}function q(){document.querySelectorAll(".todo").forEach(e=>{e.classList.remove("active-sect")})}h.addEventListener("click",q);v.addEventListener("click",E);y.addEventListener("click",L);function x(){b(),s()}x();
