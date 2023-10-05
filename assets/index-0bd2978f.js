(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))n(c);new MutationObserver(c=>{for(const s of c)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(c){const s={};return c.integrity&&(s.integrity=c.integrity),c.referrerPolicy&&(s.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?s.credentials="include":c.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(c){if(c.ep)return;c.ep=!0;const s=t(c);fetch(c.href,s)}})();const p="/Todo-app/assets/icon-cross-37f00ffb.svg";//!7-t permitir que las tareas se guarden en el localstorage
const h=document.querySelector(".form"),f=document.querySelector(".todos"),m=document.querySelector(".form__input"),L=document.querySelector("#clear-completed"),y=document.querySelector(".todo-actions__spn--p"),d=document.querySelector("#all"),r=document.querySelector("#active"),i=document.querySelector("#completed");function k(e){const o=`
    <div class="todo">
      <div class="todo-wrapper">
        <input
          class="todo-checkbox"
          type="checkbox"
          name="todo-check"
          id="checkbox"
        />
        <p class="todo__p">${e}</p>
      </div>
      <img
        src="${p}"
        alt="delete a todo"
        class="delete-todo"
      />
    </div>
  `,t=document.createElement("div");return t.innerHTML=o,t}function g(){h.addEventListener("submit",e=>{e.preventDefault();const o=m.value.trim();if(o!==""){const t=k(o);f.appendChild(t),m.value="",b(t),l()}})}function v(e){e.remove(),l()}f.addEventListener("click",e=>{if(e.target.classList.contains("delete-todo")){const o=e.target.closest(".todo");o&&v(o)}});function b(e){const o=e.querySelector(".todo-checkbox"),t=e.querySelector(".todo__p");o.addEventListener("change",()=>{t.classList.toggle("checked-active",o.checked),l()})}function l(){const e=document.querySelectorAll(".todo-checkbox").length,o=document.querySelectorAll(".todo-checkbox:checked").length,t=e-o;y.textContent=t}L.addEventListener("click",()=>{document.querySelectorAll(".todo-checkbox:checked").forEach(o=>{const t=o.closest(".todo");t&&v(t)})});function u(e){e.target===d?(d.classList.add("active-state"),r.classList.remove("active-state"),i.classList.remove("active-state")):e.target===r?(d.classList.remove("active-state"),r.classList.add("active-state"),i.classList.remove("active-state")):(d.classList.remove("active-state"),r.classList.remove("active-state"),i.classList.add("active-state"))}function E(e){document.querySelectorAll("#checkbox").forEach(t=>{const n=t.closest(".todo");t.checked?n.classList.add("active-sect"):n.classList.remove("active-sect")}),u(e)}function S(e){document.querySelectorAll("#checkbox").forEach(t=>{const n=t.closest(".todo");t.checked?n.classList.remove("active-sect"):n.classList.add("active-sect")}),u(e)}function q(e){document.querySelectorAll(".todo").forEach(t=>{t.classList.remove("active-sect")}),u(e)}d.addEventListener("click",q);r.addEventListener("click",E);i.addEventListener("click",S);function x(){g(),l()}x();
