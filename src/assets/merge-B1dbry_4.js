import { u as ke, b as y, j as e } from "./react-vendor-DOGFqpBB.js";
import {
  u as Ee,
  T as z,
  a as R,
  p as K,
  b as de,
  e as Le,
  r as O,
  c as A,
  d as Te,
  D as Ue,
  s as Be,
  f as Fe,
  g as De,
  h as oe,
  C as q,
  V as Xe,
} from "./unrar-D2pV8Jg8.js";
import { Z as ge, B as W, U as Me, a as Q, b as _ } from "./zipjs-CwBjAYAv.js";
import { g as J, G as pe } from "./pdf-worker-BgPdj0DD.js";
import { P as M } from "./pdf-lib-y8eHhPxn.js";
import { c as Oe } from "./unrar-BE6MZCHv.js";
import "@squoosh-kit/resize";
const G = new WeakMap();
let ie;
function Y(t) {
  const a = G.get(t);
  if (a) return a;
  const c = (async () => {
    ie ||= fetch(Ee).then((i) => {
      if (!i.ok) throw new Error("No se pudo cargar el extractor CBR");
      return i.arrayBuffer();
    });
    const o = await Oe({ data: await t.arrayBuffer(), wasmBinary: await ie }),
      r = new ge(new W("application/zip"));
    let s = 0;
    try {
      for (const i of o.extract().files) {
        const l = i.fileHeader.name;
        i.fileHeader.flags.directory ||
          !i.extraction ||
          l.toLowerCase().startsWith("__macos") ||
          (!/\.(jpe?g|png|gif|bmp|webp)$/i.test(l) && !/(^|\/)comicinfo\.xml$/i.test(l)) ||
          (/\.(jpe?g|png|gif|bmp|webp)$/i.test(l) && s++, await r.add(l, new Me(i.extraction)));
      }
      if (!s) throw new Error("El CBR no contiene páginas de imagen compatibles");
      return new File([await r.close()], t.name.replace(/\.cbr$/i, ".cbz"), {
        type: "application/zip",
      });
    } catch (i) {
      throw (await r.close().catch(() => {}), i);
    }
  })();
  return (G.set(t, c), c.catch(() => G.delete(t)), c);
}
pe.workerSrc = "/pdf.worker.min.mjs";
function detectFileType(t) {
  switch (t.name.toLowerCase().split(".").pop()) {
    case "cbz":
      return "cbz";
    case "cbr":
      return "cbr";
    case "pdf":
      return "pdf";
    case "xtc":
    case "xtch":
      return "xtc";
    default:
      return "unknown";
  }
}
function validateSameType(t) {
  if (t.length === 0) return { valid: !1, type: "unknown", error: "No se seleccionaron archivos" };
  const a = detectFileType(t[0]);
  if (a === "unknown") return { valid: !1, type: "unknown", error: "Formato no admitido" };
  for (let c = 1; c < t.length; c++)
    if (detectFileType(t[c]) !== a)
      return { valid: !1, type: a, error: "Todos los archivos deben ser del mismo formato" };
  return { valid: !0, type: a };
}
async function mergeFiles(t, a, c, o = { width: R, height: z }) {
  const r = validateSameType(t);
  if (!r.valid) throw new Error(r.error);
  switch (r.type) {
    case "cbr":
      return mergeCbzFiles(await Promise.all(t.map(Y)), a, c, o);
    case "cbz":
      return mergeCbzFiles(t, a, c, o);
    case "pdf":
      return mergePdfFiles(t, a, c, o);
    case "xtc":
      return mergeXtcFiles(t, a, c, o);
    default:
      throw new Error("Unsupported file type");
  }
}
async function mergeCbzFiles(t, a, c, o = { width: R, height: z }) {
  const r = [],
    s = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
  let i = 0;
  for (let l = 0; l < t.length; l++) {
    const d = t[l];
    c({ file: d.name, fileIndex: l, totalFiles: t.length, pageProgress: 0 });
    const f = new Q(new _(d)),
      p = await f.getEntries(),
      g = [];
    for (const h of p) {
      if (h.directory) continue;
      const m = h.filename;
      if (m.toLowerCase().startsWith("__macos")) continue;
      const w = m.toLowerCase().substring(m.lastIndexOf("."));
      s.includes(w) && g.push({ path: m, entry: h });
    }
    g.sort((h, m) => h.path.localeCompare(m.path));
    for (let h = 0; h < g.length; h++) {
      const m = g[h],
        w = await m.entry.getData(new W()),
        u = m.path.substring(m.path.lastIndexOf("."));
      (r.push({ name: `${String(i + 1).padStart(5, "0")}${u}`, blob: w }),
        i++,
        c({ file: d.name, fileIndex: l, totalFiles: t.length, pageProgress: (h + 1) / g.length }));
    }
    await f.close();
  }
  if (a === "cbz") {
    const l = await buildCbz(r);
    return { name: "merged.cbz", data: l, size: l.byteLength, pageCount: r.length };
  } else {
    const d = (
        await imageBlobsToCanvases(
          r.map((g) => g.blob),
          (g, h, m) => {
            c({
              file: "Converting to XTC",
              fileIndex: t.length - 1,
              totalFiles: t.length,
              pageProgress: g / h,
              previewUrl: m,
            });
          },
          o,
        )
      ).map((g, h) => ({ name: `${String(h).padStart(5, "0")}.png`, canvas: g })),
      f = d.map((g) => g.canvas.toDataURL("image/png")),
      p = await A(d);
    return { name: "merged.xtc", data: p, size: p.byteLength, pageCount: d.length, pageImages: f };
  }
}
async function mergePdfFiles(t, a, c, o = { width: R, height: z }) {
  if (a === "pdf") {
    const s = await M.create();
    let i = 0;
    for (let d = 0; d < t.length; d++) {
      const f = t[d];
      c({ file: f.name, fileIndex: d, totalFiles: t.length, pageProgress: 0 });
      const p = await f.arrayBuffer(),
        g = await M.load(p),
        h = g.getPageIndices(),
        m = await s.copyPages(g, h);
      for (const w of m) (s.addPage(w), i++);
      c({ file: f.name, fileIndex: d, totalFiles: t.length, pageProgress: 1 });
    }
    const l = await s.save();
    return { name: "merged.pdf", data: l.buffer, size: l.byteLength, pageCount: i };
  }
  const r = [];
  for (let s = 0; s < t.length; s++) {
    const i = t[s];
    c({ file: i.name, fileIndex: s, totalFiles: t.length, pageProgress: 0 });
    const l = await i.arrayBuffer(),
      d = await J({ data: l }).promise,
      f = d.numPages;
    for (let p = 1; p <= f; p++) {
      const g = await d.getPage(p),
        m = g.getViewport({ scale: 2 }),
        w = document.createElement("canvas");
      ((w.width = m.width),
        (w.height = m.height),
        await g.render({ canvas: w, viewport: m, background: "rgb(255,255,255)" }).promise,
        r.push(w),
        c({
          file: i.name,
          fileIndex: s,
          totalFiles: t.length,
          pageProgress: p / f,
          previewUrl: w.toDataURL("image/png"),
        }));
    }
  }
  if (a === "cbz") {
    const s = r.map((l, d) => ({
        name: `${String(d + 1).padStart(5, "0")}.png`,
        blob: dataURLtoBlob(l.toDataURL("image/png")),
      })),
      i = await buildCbz(s);
    return { name: "merged.cbz", data: i, size: i.byteLength, pageCount: r.length };
  } else {
    const s = await Promise.all(
        r.map(async (d, f) => ({
          name: `${String(f).padStart(5, "0")}.png`,
          canvas: await O(d, 255, o.width, o.height, !0),
        })),
      ),
      i = s.map((d) => d.canvas.toDataURL("image/png")),
      l = await A(s);
    return { name: "merged.xtc", data: l, size: l.byteLength, pageCount: s.length, pageImages: i };
  }
}
async function mergeXtcFiles(t, a, c, o = { width: R, height: z }) {
  if (a === "xtc") {
    const r = [];
    let s = { title: "", author: "", toc: [] },
      i = 0;
    const l = await t[0].slice(0, 4).arrayBuffer(),
      d = new Uint8Array(l)[3] === 72;
    for (let p = 0; p < t.length; p++) {
      const g = t[p];
      c({ file: g.name, fileIndex: p, totalFiles: t.length, pageProgress: 0 });
      const h = await g.arrayBuffer(),
        m = await K(h);
      if ((new Uint8Array(h)[3] === 72) !== d)
        throw new Error(
          "No mezcles XTC y XTCH en una misma fusión. Fusiona archivos con la misma profundidad de gris.",
        );
      if (
        (r.push(...m.pageData),
        p === 0 && ((s.title = m.metadata?.title || ""), (s.author = m.metadata?.author || "")),
        m.metadata?.toc)
      )
        for (const u of m.metadata.toc)
          s.toc.push({ title: u.title, startPage: u.startPage + i, endPage: u.endPage + i });
      ((i += m.header.pageCount),
        c({ file: g.name, fileIndex: p, totalFiles: t.length, pageProgress: 1 }));
    }
    const f = await de(r, { metadata: s, is2bit: d });
    return {
      name: "merged." + (d ? "xtch" : "xtc"),
      data: f,
      size: f.byteLength,
      pageCount: r.length,
    };
  } else {
    const r = [];
    for (let l = 0; l < t.length; l++) {
      const d = t[l];
      c({ file: d.name, fileIndex: l, totalFiles: t.length, pageProgress: 0 });
      const f = await d.arrayBuffer(),
        p = await Le(f);
      (r.push(...p), c({ file: d.name, fileIndex: l, totalFiles: t.length, pageProgress: 1 }));
    }
    const s = r.map((l, d) => ({
        name: `${String(d + 1).padStart(5, "0")}.png`,
        blob: dataURLtoBlob(l.toDataURL("image/png")),
      })),
      i = await buildCbz(s);
    return { name: "merged.cbz", data: i, size: i.byteLength, pageCount: r.length };
  }
}
async function buildCbz(t) {
  const a = new W("application/zip"),
    c = new ge(a);
  for (const r of t) await c.add(r.name, new _(r.blob));
  return (await c.close(), (await a.getData()).arrayBuffer());
}
async function splitPdf(t, a) {
  const c = await t.arrayBuffer(),
    o = await M.load(c),
    r = [];
  for (const s of a) {
    const i = await M.create(),
      l = [];
    for (let p = s.start - 1; p < s.end; p++) l.push(p);
    const d = await i.copyPages(o, l);
    for (const p of d) i.addPage(p);
    const f = await i.save();
    r.push({ data: f.buffer, pageCount: d.length });
  }
  return r;
}
async function imageBlobsToCanvases(t, a, c = { width: R, height: z }) {
  const o = [];
  for (let r = 0; r < t.length; r++) {
    const s = await blobToCanvas(t[r]),
      i = await O(s, 255, c.width, c.height, !0);
    (o.push(i), a(r + 1, t.length, i.toDataURL("image/png")));
  }
  return o;
}
function blobToCanvas(t) {
  return new Promise((a, c) => {
    const o = new Image(),
      r = URL.createObjectURL(t);
    ((o.onload = () => {
      URL.revokeObjectURL(r);
      const s = document.createElement("canvas");
      ((s.width = o.width), (s.height = o.height), s.getContext("2d").drawImage(o, 0, 0), a(s));
    }),
      (o.onerror = () => {
        (URL.revokeObjectURL(r), c(new Error("Failed to load image")));
      }),
      (o.src = r));
  });
}
function dataURLtoBlob(t) {
  const a = t.split(","),
    c = a[0].match(/:(.*?);/)[1],
    o = atob(a[1]),
    r = o.length,
    s = new Uint8Array(r);
  for (let i = 0; i < r; i++) s[i] = o.charCodeAt(i);
  return new Blob([s], { type: c });
}
pe.workerSrc = "/pdf.worker.min.mjs";
function parsePageRanges(t, a) {
  const c = [],
    o = t
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);
  for (const r of o) {
    if (!/^\d+(?:\s*-\s*\d+)?$/.test(r)) throw new Error(`Rango no válido: ${r}`);
    if (r.includes("-")) {
      const [s, i] = r.split("-").map((f) => f.trim()),
        l = parseInt(s, 10),
        d = parseInt(i, 10);
      if (isNaN(l) || isNaN(d)) throw new Error(`Rango no válido: ${r}`);
      if (l < 1 || d > a || l > d)
        throw new Error(`Rango no válido: ${r} (total de páginas: ${a})`);
      c.push({ start: l, end: d });
    } else {
      const s = parseInt(r, 10);
      if (isNaN(s) || s < 1 || s > a)
        throw new Error(`Página no válida: ${r} (total de páginas: ${a})`);
      c.push({ start: s, end: s });
    }
  }
  return c;
}
function calculateEqualParts(t, a) {
  if (!Number.isInteger(a) || a < 1)
    throw new Error("El número de partes debe ser un entero positivo");
  if (a > t) throw new Error(`No se pueden dividir ${t} páginas en ${a} partes`);
  const c = [],
    o = Math.floor(t / a),
    r = t % a;
  let s = 1;
  for (let i = 0; i < a; i++) {
    const l = o + (i < r ? 1 : 0);
    (c.push({ start: s, end: s + l - 1 }), (s += l));
  }
  return c;
}
async function getPageCount(t) {
  if (/\.cbr$/i.test(t.name)) return getPageCount(await Y(t));
  switch (detectFileType(t)) {
    case "cbz":
      return getCbzPageCount(t);
    case "pdf":
      return getPdfPageCount(t);
    case "xtc":
      const c = await t.arrayBuffer();
      return (await K(c)).header.pageCount;
    default:
      throw new Error("Unsupported file type");
  }
}
async function getCbzPageCount(t) {
  const a = new Q(new _(t)),
    c = await a.getEntries(),
    o = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
  let r = 0;
  for (const s of c) {
    if (s.directory) continue;
    const i = s.filename;
    if (i.toLowerCase().startsWith("__macos")) continue;
    const l = i.toLowerCase().substring(i.lastIndexOf("."));
    o.includes(l) && r++;
  }
  return (await a.close(), r);
}
async function getPdfPageCount(t) {
  const a = await t.arrayBuffer();
  return (await J({ data: a }).promise).numPages;
}
async function splitFile(t, a, c, o, r = { width: R, height: z }) {
  if (/\.cbr$/i.test(t.name)) return splitFile(await Y(t), a, c, o, r);
  switch (detectFileType(t)) {
    case "cbz":
      return splitCbzFile(t, a, c, o, r);
    case "pdf":
      return splitPdfFile(t, a, c, o, r);
    case "xtc":
      return splitXtcFile(t, a, c, o, r);
    default:
      throw new Error("Unsupported file type");
  }
}
async function splitCbzFile(t, a, c, o, r = { width: R, height: z }) {
  const s = new Q(new _(t)),
    i = await s.getEntries(),
    l = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"],
    d = [];
  for (const g of i) {
    if (g.directory) continue;
    const h = g.filename;
    if (h.toLowerCase().startsWith("__macos")) continue;
    const m = h.toLowerCase().substring(h.lastIndexOf("."));
    l.includes(m) && d.push({ path: h, entry: g });
  }
  d.sort((g, h) => g.path.localeCompare(h.path));
  const f = t.name.replace(/\.cbz$/i, ""),
    p = [];
  for (let g = 0; g < a.length; g++) {
    const h = a[g],
      m = h.end - h.start + 1;
    o({ phase: "building", rangeIndex: g, totalRanges: a.length, pageProgress: 0 });
    const w = [];
    for (let u = h.start - 1; u < h.end; u++) {
      const b = d[u],
        j = await b.entry.getData(new W()),
        k = b.path.substring(b.path.lastIndexOf("."));
      (w.push({ name: `${String(w.length + 1).padStart(5, "0")}${k}`, blob: j }),
        o({ phase: "building", rangeIndex: g, totalRanges: a.length, pageProgress: w.length / m }));
    }
    if (c === "cbz") {
      const u = await buildCbz(w);
      p.push({ name: `${f}_part${g + 1}.cbz`, data: u, size: u.byteLength, pageCount: w.length });
    } else {
      const u = await blobsToCanvases(w.map((E) => E.blob)),
        b = await Promise.all(
          u.map(async (E, H) => ({
            name: `${String(H).padStart(5, "0")}.png`,
            canvas: await O(E, 255, r.width, r.height, !0),
          })),
        ),
        j = b.map((E) => E.canvas.toDataURL("image/png")),
        k = await A(b);
      p.push({
        name: `${f}_part${g + 1}.xtc`,
        data: k,
        size: k.byteLength,
        pageCount: b.length,
        pageImages: j,
      });
    }
  }
  return (await s.close(), p);
}
async function splitPdfFile(t, a, c, o, r = { width: R, height: z }) {
  const s = t.name.replace(/\.pdf$/i, "");
  if (c === "pdf") {
    o({ phase: "extracting", rangeIndex: 0, totalRanges: a.length, pageProgress: 0 });
    const f = await splitPdf(t, a),
      p = [];
    for (let g = 0; g < a.length; g++) {
      const { data: h, pageCount: m } = f[g];
      (p.push({ name: `${s}_part${g + 1}.pdf`, data: h, size: h.byteLength, pageCount: m }),
        o({ phase: "building", rangeIndex: g, totalRanges: a.length, pageProgress: 1 }));
    }
    return p;
  }
  const i = await t.arrayBuffer(),
    l = await J({ data: i }).promise,
    d = [];
  for (let f = 0; f < a.length; f++) {
    const p = a[f],
      g = p.end - p.start + 1;
    o({ phase: "building", rangeIndex: f, totalRanges: a.length, pageProgress: 0 });
    const h = [];
    for (let m = p.start; m <= p.end; m++) {
      const w = await l.getPage(m),
        b = w.getViewport({ scale: 2 }),
        j = document.createElement("canvas");
      ((j.width = b.width),
        (j.height = b.height),
        await w.render({ canvas: j, viewport: b, background: "rgb(255,255,255)" }).promise,
        h.push(j),
        o({
          phase: "building",
          rangeIndex: f,
          totalRanges: a.length,
          pageProgress: h.length / g,
          previewUrl: j.toDataURL("image/png"),
        }));
    }
    if (c === "cbz") {
      const m = h.map((u, b) => ({
          name: `${String(b + 1).padStart(5, "0")}.png`,
          blob: dataURLtoBlobRecovered(u.toDataURL("image/png")),
        })),
        w = await buildCbz(m);
      d.push({ name: `${s}_part${f + 1}.cbz`, data: w, size: w.byteLength, pageCount: h.length });
    } else {
      const m = await Promise.all(
          h.map(async (b, j) => ({
            name: `${String(j).padStart(5, "0")}.png`,
            canvas: await O(b, 255, r.width, r.height, !0),
          })),
        ),
        w = m.map((b) => b.canvas.toDataURL("image/png")),
        u = await A(m);
      d.push({
        name: `${s}_part${f + 1}.xtc`,
        data: u,
        size: u.byteLength,
        pageCount: m.length,
        pageImages: w,
      });
    }
  }
  return d;
}
async function splitXtcFile(t, a, c, o, r = { width: R, height: z }) {
  const s = await t.arrayBuffer(),
    i = await K(s),
    l = i.header.is2bit,
    d = t.name.replace(/\.xtch?$/i, ""),
    f = [];
  for (let p = 0; p < a.length; p++) {
    const g = a[p];
    o({ phase: "building", rangeIndex: p, totalRanges: a.length, pageProgress: 0.5 });
    const h = i.pageData.slice(g.start - 1, g.end);
    if (c === "xtc") {
      const m = {
        title: `${i.metadata?.title || d} - Part ${p + 1}`,
        author: i.metadata?.author || "",
        toc: [],
      };
      if (i.metadata?.toc)
        for (const u of i.metadata.toc) {
          const b = Math.max(u.startPage, g.start),
            j = Math.min(u.endPage, g.end);
          b <= j &&
            m.toc.push({ title: u.title, startPage: b - g.start + 1, endPage: j - g.start + 1 });
        }
      const w = await de(h, { metadata: m, is2bit: l });
      f.push({
        name: `${d}_part${p + 1}.${l ? "xtch" : "xtc"}`,
        data: w,
        size: w.byteLength,
        pageCount: h.length,
      });
    } else {
      const m = h.map((b) => Te(b)),
        w = m.map((b, j) => ({
          name: `${String(j + 1).padStart(5, "0")}.png`,
          blob: dataURLtoBlobRecovered(b.toDataURL("image/png")),
        })),
        u = await buildCbz(w);
      f.push({ name: `${d}_part${p + 1}.cbz`, data: u, size: u.byteLength, pageCount: m.length });
    }
    o({ phase: "building", rangeIndex: p, totalRanges: a.length, pageProgress: 1 });
  }
  return f;
}
async function blobsToCanvases(t) {
  return Promise.all(t.map(blobToCanvasRecovered));
}
function blobToCanvasRecovered(t) {
  return new Promise((a, c) => {
    const o = new Image(),
      r = URL.createObjectURL(t);
    ((o.onload = () => {
      URL.revokeObjectURL(r);
      const s = document.createElement("canvas");
      ((s.width = o.width), (s.height = o.height), s.getContext("2d").drawImage(o, 0, 0), a(s));
    }),
      (o.onerror = () => {
        (URL.revokeObjectURL(r), c(new Error("Failed to load image")));
      }),
      (o.src = r));
  });
}
function dataURLtoBlobRecovered(t) {
  const a = t.split(","),
    c = a[0].match(/:(.*?);/)[1],
    o = atob(a[1]),
    r = new Uint8Array(o.length);
  for (let s = 0; s < o.length; s++) r[s] = o.charCodeAt(s);
  return new Blob([r], { type: c });
}
function MergePage() {
  const t = ke(),
    [a, c] = y.useState("split"),
    [o, r] = y.useState([]),
    [s, i] = y.useState(null),
    [l, d] = y.useState(!1),
    [f, p] = y.useState(0),
    [g, h] = y.useState(""),
    [m, w] = y.useState(null),
    [u, b] = y.useState([]),
    [j, k] = y.useState([]),
    [E, H] = y.useState(0),
    [ee, T] = y.useState(null),
    [V, xe] = y.useState("X4"),
    [L, be] = y.useState("ranges"),
    [U, te] = y.useState(""),
    [S, ve] = y.useState(2),
    [P, D] = y.useState(null),
    [Z, ye] = y.useState("xtc"),
    I = y.useMemo(() => (s ? (s === "xtc" ? Z : s === "pdf" ? "pdf" : "cbz") : "cbz"), [s, Z]),
    ae = y.useMemo(() => {
      if (a !== "split" || P === null) return 0;
      if (L === "parts") return Math.min(S, P);
      try {
        return parsePageRanges(U, P).length;
      } catch {
        return 0;
      }
    }, [a, L, S, U, P]),
    X = y.useCallback(
      async (n) => {
        if (a === "split") {
          const x = n[0];
          if (!x) return;
          const v = detectFileType(x);
          if (v === "unknown") {
            T("Formato no admitido. Usa CBR, CBZ, PDF o XTC/XTCH.");
            return;
          }
          (r([x]), D(null), i(v), T(null), b([]));
          try {
            const N = await getPageCount(x);
            D(N);
          } catch (N) {
            T(N instanceof Error ? N.message : "No se pudo leer el archivo");
          }
        } else {
          const x = [...o, ...n],
            v = validateSameType(x);
          if (!v.valid) {
            T(v.error || "Archivos no válidos");
            return;
          }
          (r(x), i(v.type), T(null), b([]));
        }
      },
      [a, o],
    ),
    Ce = y.useCallback(
      (n) => {
        n.preventDefault();
        const x = Array.from(n.dataTransfer.files).filter((v) => {
          const N = v.name.toLowerCase().split(".").pop();
          return ["cbr", "cbz", "pdf", "xtc", "xtch", "xtcz"].includes(N || "");
        });
        x.length > 0 && X(x);
      },
      [X],
    ),
    je = y.useCallback(
      (n) => {
        n.target.files && (X(Array.from(n.target.files)), (n.target.value = ""));
      },
      [X],
    ),
    Ne = y.useCallback((n) => {
      (r((x) => {
        const v = x.filter((N, C) => C !== n);
        return (v.length === 0 && (i(null), D(null)), v);
      }),
        b([]));
    }, []),
    ne = y.useCallback((n) => {
      (c(n), r([]), i(null), b([]), T(null), D(null), te(""));
    }, []),
    Pe = y.useCallback(async () => {
      if (o.length !== 0) {
        (d(!0), b([]), p(0), h("Procesando…"), w(null));
        try {
          const n = Ue[V];
          if (a === "merge") {
            const x = await mergeFiles(
              o,
              I,
              (v) => {
                (h(v.file),
                  p((v.fileIndex + v.pageProgress) / v.totalFiles),
                  v.previewUrl && w(v.previewUrl));
              },
              n,
            );
            b([{ ...x, selected: !0 }]);
          } else {
            const x = o[0];
            let v;
            L === "ranges" ? (v = parsePageRanges(U, P)) : (v = calculateEqualParts(P, S));
            const N = await splitFile(
              x,
              v,
              I,
              (C) => {
                (h(
                  C.phase === "extracting"
                    ? "Extrayendo páginas…"
                    : `Creando parte ${C.rangeIndex + 1}/${C.totalRanges}`,
                ),
                  C.phase === "extracting"
                    ? p(C.pageProgress * 0.5)
                    : p(0.5 + ((C.rangeIndex + C.pageProgress) / C.totalRanges) * 0.5),
                  C.previewUrl && w(C.previewUrl));
              },
              n,
            );
            b(N.map((C) => ({ ...C, selected: !0 })));
          }
          (p(1), h("Terminado"));
        } catch (n) {
          (console.error("Processing error:", n),
            b([
              {
                name: "error",
                data: new ArrayBuffer(0),
                size: 0,
                pageCount: 0,
                error: n instanceof Error ? n.message : "Error desconocido",
              },
            ]));
        } finally {
          (d(!1), w(null));
        }
      }
    }, [o, a, I, L, U, S, P, V]),
    se = y.useCallback(async (n) => {
      if (!n.data) return;
      const x = () => {
        const v = new Blob([n.data], { type: "application/octet-stream" }),
          N = URL.createObjectURL(v),
          C = document.createElement("a");
        ((C.href = N),
          (C.download = n.name),
          document.body.appendChild(C),
          C.click(),
          setTimeout(() => {
            (document.body.removeChild(C), URL.revokeObjectURL(N));
          }, 100));
      };
      try {
        if (n.size > 50 * 1024 * 1024) {
          const N = Be.createWriteStream(n.name, { size: n.size }).getWriter();
          (await N.write(new Uint8Array(n.data)), await N.close());
        } else x();
      } catch (v) {
        (console.warn("StreamSaver failed, falling back to simple download", v), x());
      }
    }, []),
    Ie = y.useCallback((n) => {
      n.pageImages && (k(n.pageImages), H(n.pageCount || n.pageImages.length));
    }, []),
    ze = y.useCallback((n) => {
      b((x) => x.map((v, N) => (N === n ? { ...v, selected: !v.selected } : v)));
    }, []),
    Re = y.useCallback(() => {
      const n = u.every((x) => x.selected);
      b((x) => x.map((v) => ({ ...v, selected: !n })));
    }, [u]),
    $ = u.filter((n) => n.selected && !n.error),
    re = $.length > 0 && (I === "cbz" || I === "pdf"),
    Se = y.useCallback(() => {
      const n = $.map((x) => Fe(x.data, x.name));
      (De(n), t(I === "pdf" ? { to: "/" } : { to: "/" }));
    }, [$, I, t]),
    $e =
      a === "merge"
        ? o.length >= 2
        : o.length === 1 &&
          P !== null &&
          (L === "parts" ? Number.isInteger(S) && S >= 2 && S <= P : U.trim().length > 0);
  return e.jsxs("div", {
    className: "merge-workspace",
    children: [
      e.jsxs("section", {
        className: "mode-toggle",
        children: [
          e.jsx("button", {
            className: a === "merge" ? "active" : "",
            onClick: () => ne("merge"),
            children: "Fusionar",
          }),
          e.jsx("button", {
            className: a === "split" ? "active" : "",
            onClick: () => ne("split"),
            children: "Dividir",
          }),
        ],
      }),
      e.jsx("section", {
        className: "dropzone-wrapper",
        children: e.jsxs("div", {
          className: "dropzone",
          onDragOver: (n) => n.preventDefault(),
          onDrop: Ce,
          onClick: () => document.getElementById("merge-file-input")?.click(),
          tabIndex: 0,
          onKeyDown: (n) => {
            (n.key === "Enter" || n.key === " ") &&
              (n.preventDefault(), document.getElementById("merge-file-input")?.click());
          },
          children: [
            e.jsxs("div", {
              className: "dropzone-inner",
              children: [
                e.jsx("div", {
                  className: "dropzone-icon",
                  children: e.jsxs("svg", {
                    viewBox: "0 0 48 48",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    children: [
                      e.jsx("rect", { x: "8", y: "8", width: "32", height: "32", rx: "2" }),
                      e.jsx("path", { d: "M16 28l8-8 8 8" }),
                      e.jsx("path", { d: "M24 20v16" }),
                    ],
                  }),
                }),
                e.jsxs("div", {
                  className: "dropzone-text",
                  children: [
                    e.jsx("span", {
                      className: "dropzone-primary",
                      children:
                        a === "merge"
                          ? "Elige los archivos que quieres fusionar"
                          : "Elige el archivo que quieres dividir",
                    }),
                    e.jsxs("span", {
                      className: "dropzone-secondary",
                      children: [
                        "CBR, CBZ, PDF o XTC/XTCH ",
                        a === "merge" ? "(del mismo formato)" : "",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            e.jsx("input", {
              id: "merge-file-input",
              type: "file",
              accept:
                ".cbr,.CBR,.cbz,.CBZ,.pdf,.PDF,.xtc,.XTC,.xtch,.XTCH,.xtcz,.XTCZ,application/pdf,application/zip,application/x-cbz,application/octet-stream",
              multiple: a === "merge",
              hidden: !0,
              onChange: je,
            }),
          ],
        }),
      }),
      ee && e.jsx("div", { className: "type-error", children: e.jsx("p", { children: ee }) }),
      o.length > 0 &&
        e.jsxs("section", {
          className: "file-list",
          children: [
            e.jsxs("div", {
              className: "section-header",
              children: [
                e.jsx("h2", { children: "Archivos" }),
                e.jsx("span", { className: "badge", children: o.length }),
                s &&
                  e.jsx("span", {
                    className: "type-badge",
                    children: o[0]?.name.toLowerCase().endsWith(".xtch") ? "XTCH" : s.toUpperCase(),
                  }),
              ],
            }),
            e.jsx("div", {
              className: "files-grid",
              children: o.map((n, x) =>
                e.jsxs(
                  "div",
                  {
                    className: "file-item",
                    children: [
                      e.jsx("span", { className: "name", children: n.name }),
                      e.jsx("span", { className: "size", children: oe(n.size) }),
                      e.jsx("button", {
                        className: "remove",
                        onClick: () => Ne(x),
                        "aria-label": "Quitar archivo",
                        children: "×",
                      }),
                    ],
                  },
                  `${n.name}-${x}`,
                ),
              ),
            }),
            a === "split" &&
              P !== null &&
              e.jsxs("div", {
                className: "page-info",
                children: ["Total de páginas: ", e.jsx("strong", { children: P })],
              }),
          ],
        }),
      o.length > 0 &&
        e.jsxs("aside", {
          className: "options-panel",
          children: [
            e.jsx("div", {
              className: "section-header",
              children: e.jsx("h2", { children: "Opciones" }),
            }),
            e.jsx("div", {
              className: "option",
              children: e.jsx(q, {
                label: "Dispositivo",
                value: V,
                choices: [
                  { value: "X4", label: "X4 / Classic V2 · 480 × 800" },
                  { value: "X3", label: "X3 · 528 × 792" },
                  { value: "X4Pro", label: "X4 Pro · 480 × 800" },
                ],
                onChange: (n) => xe(n),
              }),
            }),
            s === "xtc" &&
              e.jsx("div", {
                className: "option",
                children: e.jsx(q, {
                  label: "Formato de salida",
                  value: Z,
                  choices: [
                    { value: "xtc", label: "Conservar XTC / XTCH" },
                    { value: "cbz", label: "Exportar imágenes CBZ" },
                  ],
                  onChange: (n) => ye(n),
                }),
              }),
            (s === "cbz" || s === "cbr") &&
              e.jsxs("div", {
                className: "option",
                children: [
                  e.jsx("label", { children: "Formato de salida" }),
                  e.jsxs("div", {
                    className: "output-info",
                    children: [
                      e.jsx("span", { className: "output-format-badge", children: "CBZ" }),
                      e.jsx("span", {
                        className: "output-hint",
                        children: "Envía al conversor para crear XTC",
                      }),
                    ],
                  }),
                ],
              }),
            s === "pdf" &&
              e.jsxs("div", {
                className: "option",
                children: [
                  e.jsx("label", { children: "Formato de salida" }),
                  e.jsxs("div", {
                    className: "output-info",
                    children: [
                      e.jsx("span", { className: "output-format-badge", children: "PDF" }),
                      e.jsx("span", {
                        className: "output-hint",
                        children: "Envía al conversor para crear XTC",
                      }),
                    ],
                  }),
                ],
              }),
            a === "split" &&
              e.jsxs(e.Fragment, {
                children: [
                  e.jsx("div", {
                    className: "option",
                    children: e.jsx(q, {
                      label: "Cómo dividir",
                      value: L,
                      choices: [
                        { value: "ranges", label: "Rangos de páginas" },
                        { value: "parts", label: "Partes iguales" },
                      ],
                      onChange: (n) => be(n),
                    }),
                  }),
                  L === "ranges"
                    ? e.jsxs("div", {
                        className: "option",
                        children: [
                          e.jsx("label", { htmlFor: "rangesInput", children: "Rangos de páginas" }),
                          e.jsx("input", {
                            type: "text",
                            id: "rangesInput",
                            placeholder: "Ejemplo: 1-10, 11-20, 21-30",
                            value: U,
                            onChange: (n) => te(n.target.value),
                          }),
                          e.jsx("small", {
                            className: "help-text",
                            children: "Separa los rangos con comas",
                          }),
                        ],
                      })
                    : e.jsxs("div", {
                        className: "option",
                        children: [
                          e.jsx("label", { htmlFor: "partsCount", children: "Número de partes" }),
                          e.jsx("input", {
                            type: "number",
                            id: "partsCount",
                            min: 2,
                            max: P || 100,
                            value: S,
                            onChange: (n) =>
                              ve(n.target.value === "" ? "" : parseInt(n.target.value)),
                          }),
                        ],
                      }),
                  ae > 0 &&
                    e.jsxs("div", {
                      className: "output-preview",
                      children: [
                        "Se crearán ",
                        e.jsx("strong", { children: ae }),
                        " archivos ",
                        I.toUpperCase(),
                      ],
                    }),
                ],
              }),
            a === "merge" &&
              o.length >= 2 &&
              e.jsxs("div", {
                className: "output-preview",
                children: [
                  "Se creará ",
                  e.jsx("strong", { children: "1" }),
                  " archivo ",
                  I.toUpperCase(),
                ],
              }),
          ],
        }),
      o.length > 0 &&
        e.jsxs("section", {
          className: "action-section",
          children: [
            e.jsxs("button", {
              className: `btn-convert${l ? " loading" : ""}`,
              onClick: Pe,
              disabled: l || !$e,
              children: [
                e.jsx("span", { children: a === "merge" ? "Fusionar" : "Dividir" }),
                e.jsx("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  children: e.jsx("path", { d: "M5 12h14M12 5l7 7-7 7" }),
                }),
              ],
            }),
            a === "merge" &&
              o.length < 2 &&
              e.jsx("p", {
                className: "help-text",
                children: "Añade al menos 2 archivos para fusionar",
              }),
          ],
        }),
      l &&
        e.jsxs("section", {
          className: "progress-section",
          children: [
            e.jsxs("div", {
              className: "progress-header",
              children: [
                e.jsx("span", { className: "progress-text", children: g }),
                e.jsxs("span", {
                  className: "progress-percent",
                  children: [Math.round(f * 100), "%"],
                }),
              ],
            }),
            e.jsx("div", {
              className: "progress-track",
              children: e.jsx("div", {
                className: "progress-fill",
                style: { width: `${f * 100}%` },
              }),
            }),
            m &&
              e.jsx("div", {
                className: "preview-container",
                children: e.jsx("img", { src: m, alt: "Vista previa" }),
              }),
          ],
        }),
      u.length > 0 &&
        !u.every((n) => n.error) &&
        e.jsxs("section", {
          className: "results-section",
          children: [
            e.jsxs("div", {
              className: "section-header",
              children: [
                e.jsx("h2", { children: "Archivos listos" }),
                e.jsx("span", { className: "badge", children: u.filter((n) => !n.error).length }),
                u.length > 1 &&
                  e.jsx("button", {
                    className: "btn-select-all",
                    onClick: Re,
                    children: u.every((n) => n.selected) ? "Desmarcar todos" : "Seleccionar todos",
                  }),
              ],
            }),
            e.jsx("div", {
              className: "results-grid",
              children: u.map((n, x) =>
                e.jsxs(
                  "div",
                  {
                    className: `result-item${n.error ? " error" : ""}${n.selected ? " selected" : ""}`,
                    children: [
                      !n.error &&
                        u.length > 1 &&
                        e.jsxs("label", {
                          className: "result-checkbox",
                          children: [
                            e.jsx("input", {
                              type: "checkbox",
                              checked: n.selected || !1,
                              onChange: () => ze(x),
                            }),
                            e.jsx("span", { className: "checkmark" }),
                          ],
                        }),
                      e.jsxs("div", {
                        className: "result-info",
                        children: [
                          e.jsx("span", { className: "name", children: n.name }),
                          n.error
                            ? e.jsxs("div", { className: "info", children: ["Error: ", n.error] })
                            : e.jsxs("div", {
                                className: "info",
                                children: [n.pageCount, " páginas · ", oe(n.size)],
                              }),
                        ],
                      }),
                      !n.error &&
                        e.jsxs("div", {
                          className: "result-actions",
                          children: [
                            n.pageImages &&
                              e.jsx("button", {
                                className: "btn-preview",
                                onClick: () => Ie(n),
                                children: "Revisar",
                              }),
                            e.jsx("button", {
                              className: "btn-download",
                              onClick: () => se(n),
                              children: "Descargar",
                            }),
                          ],
                        }),
                    ],
                  },
                  `${n.name}-${x}`,
                ),
              ),
            }),
            e.jsxs("div", {
              className: "results-actions",
              children: [
                u.length > 1 &&
                  !u.some((n) => n.error) &&
                  e.jsxs("button", {
                    className: "btn-download-all",
                    onClick: () => u.forEach(se),
                    children: ["Descargar todos (", u.length, ")"],
                  }),
                re &&
                  e.jsxs("button", {
                    className: "btn-move-converter",
                    onClick: Se,
                    children: [
                      "Convertir ",
                      $.length > 1 ? `${$.length} archivos` : "",
                      " a XTC/XTCH",
                      e.jsx("svg", {
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        children: e.jsx("path", { d: "M5 12h14M12 5l7 7-7 7" }),
                      }),
                    ],
                  }),
              ],
            }),
            re &&
              $.length > 0 &&
              e.jsx("p", {
                className: "converter-hint",
                children:
                  $.length === 1
                    ? "El archivo seleccionado se enviará al conversor"
                    : `Se enviarán ${$.length} archivos seleccionados al conversor`,
              }),
          ],
        }),
      u.length > 0 &&
        u.every((n) => n.error) &&
        e.jsxs("section", {
          className: "results-section",
          children: [
            e.jsx("div", {
              className: "section-header",
              children: e.jsx("h2", { children: "Error" }),
            }),
            e.jsx("div", {
              className: "results-grid",
              children: u.map((n, x) =>
                e.jsx(
                  "div",
                  {
                    className: "result-item error",
                    children: e.jsx("div", {
                      className: "result-info",
                      children: e.jsx("div", { className: "info", children: n.error }),
                    }),
                  },
                  x,
                ),
              ),
            }),
          ],
        }),
      e.jsx(Xe, { pages: j, onClose: () => k([]), totalPages: E }),
    ],
  });
}
function dt() {
  return e.jsx(MergePage, {});
}
export { dt as component };
