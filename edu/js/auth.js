/* Lumera Auth (front-end demo only) */
const ACCESS_KEYS = [
  { id: "admin-demo",  role: "admin",  key: "LUMERA-ADMIN-KEY-EXAMPLE" },
  { id: "author-demo", role: "author", key: "LUMERA-AUTHOR-KEY-EXAMPLE" }
];

export function normalizeAuth(a){
  if(!a || !["viewer","author","admin"].includes(a.role)) return { role:"viewer" };
  return a;
}

export function getAuth(){
  try{ return normalizeAuth(JSON.parse(localStorage.getItem("lumera.auth"))); }catch{}
  return { role:"viewer" };
}

export function setAuth(a){
  localStorage.setItem("lumera.auth", JSON.stringify(a));
}

export function promptLogin(){
  const k = window.prompt("Enter your Lumera user key:");
  if(!k) return getAuth();
  const found = ACCESS_KEYS.find(x => x.key === k.trim());
  if(found){
    const next = { role: found.role, keyId: found.id };
    setAuth(next);
    alert(`Signed in as ${found.role}.`);
    return next;
  } else {
    alert("Invalid key");
    return getAuth();
  }
}

export function signOut(){
  setAuth({ role:"viewer" });
}

export function guard(requiredRole){
  const auth = getAuth();
  if(requiredRole === "author" && (auth.role === "author" || auth.role === "admin")) return true;
  if(requiredRole === "admin"  && auth.role === "admin") return true;
  return false;
}

/* URL login (?key=...) */
(function urlLogin(){
  try{
    const p = new URLSearchParams(location.search);
    const k = p.get("key");
    if(k){
      const f = ACCESS_KEYS.find(x => x.key === k.trim());
      if(f){
        setAuth({ role: f.role, keyId: f.id });
      }
      history.replaceState({}, document.title, location.pathname);
    }
  }catch{}
})();

/* Self-tests */
(function tests(){
  const results = [];
  const assert = (n, c) => results.push({n, ok: !!c});
  assert("normalizeAuth viewer default", normalizeAuth({}).role === "viewer");
  assert("ACCESS_KEYS present", Array.isArray(ACCESS_KEYS) && ACCESS_KEYS.length >= 2);
  console.log("[Lumera Tests]", results);
})();