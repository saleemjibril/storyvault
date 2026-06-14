import { useState, useMemo } from "react";
import {
  Sparkles, Search, Filter, Upload, X, ChevronRight, ChevronDown, Check, Plus,
  LayoutGrid, LayoutDashboard, Clock, Map, MapPin, Calendar, Camera,
  Video, Image as ImageIcon, Folder, FolderOpen, Play, Tag, Pencil, Copy,
  Tractor, Plane, Users, Wheat, HeartPulse, Droplet, Baby, Sprout, Sun,
  HardDrive, Database, Cloud, ShieldCheck, Layers, HardDrive as Storage,
  TrendingUp, ArrowUpRight
} from "lucide-react";

/* ----------------------------- MOCK LIBRARY ----------------------------- */

const ASSETS = [
  { id:"a1", name:"IMG_4821.CR3", type:"photo", icon:"tractor", project:"TracTrac", location:"Kano", date:"2025-03-12", camera:"Canon R5", lens:"24-70mm f/2.8", orientation:"Landscape", objects:["tractor","woman","maize field","farmland"], activity:"Plowing field", environment:"Rural farmland", colorTheme:"Golden / Earth", subjects:["woman","farmer"], people:["Amina Yusuf"], caption:"A woman drives a red tractor across a sunlit maize field.", kw:["woman","farming","tractor","agriculture-crop","rural","kano"] },
  { id:"a2", name:"DJI_0042.JPG", type:"photo", icon:"drone", project:"UNICEF", location:"Kano", date:"2025-03-12", camera:"DJI Mavic 3", lens:"24mm wide", orientation:"Landscape", objects:["village","rooftops","fields","roads"], activity:"Aerial survey", environment:"Rural community", colorTheme:"Sky / Sand", subjects:["community"], people:[], caption:"Drone view of a rural community surrounded by farmland and dirt roads.", kw:["drone","rural","community","village","kano"] },
  { id:"a3", name:"P1090233.JPG", type:"photo", icon:"football", project:"UNICEF", location:"Lagos", date:"2025-02-04", camera:"Sony A7 IV", lens:"70-200mm f/4", orientation:"Landscape", objects:["children","football","dust","goalpost"], activity:"Playing football", environment:"Open dirt field", colorTheme:"Green / Dust", subjects:["children"], people:[], caption:"A group of children play football on an open dirt field at dusk.", kw:["child","football","playing","community","lagos"] },
  { id:"a4", name:"Portrait_088.CR3", type:"photo", icon:"elderly", project:"WHO", location:"Abuja", date:"2025-01-22", camera:"Canon R5", lens:"85mm f/1.4", orientation:"Portrait", objects:["elderly woman","headscarf","wrinkles"], activity:"Portrait", environment:"Indoor clinic", colorTheme:"Warm / Soft", subjects:["elderly woman"], people:["Hauwa Bello"], caption:"A smiling elderly woman in a patterned headscarf looks toward the camera.", kw:["elderly","woman","smiling","health","abuja"] },
  { id:"a5", name:"IMG_5503.CR3", type:"photo", icon:"maize", project:"TracTrac", location:"Kano", date:"2025-03-13", camera:"Canon R5", lens:"24-70mm f/2.8", orientation:"Landscape", objects:["maize","farmer","basket","crop"], activity:"Harvesting maize", environment:"Maize farm", colorTheme:"Golden", subjects:["farmer"], people:[], caption:"A farmer harvests ripe maize, filling a woven basket under bright sun.", kw:["farming","agriculture-crop","maize","harvest","kano"] },
  { id:"a6", name:"WHO_vax_117.JPG", type:"photo", icon:"health", project:"WHO", location:"Abuja", date:"2025-01-23", camera:"Sony A7 IV", lens:"35mm f/1.8", orientation:"Landscape", objects:["health worker","child","syringe","gloves"], activity:"Vaccinating a child", environment:"Outreach tent", colorTheme:"Clinical / Blue", subjects:["health worker","child"], people:["Dr. Chito"], caption:"A health worker carefully vaccinates a young child at an outreach tent.", kw:["health","child","community","abuja"] },
  { id:"a7", name:"DJI_0119.MP4", type:"video", duration:"0:48", icon:"water", project:"UNICEF", location:"Kano", date:"2025-03-14", camera:"DJI Mavic 3", lens:"24mm wide", orientation:"Landscape", objects:["borehole","water tank","queue","pipes"], activity:"Water project flyover", environment:"Rural village", colorTheme:"Blue / Earth", subjects:["community","water project"], people:[], caption:"Aerial footage sweeping over a new borehole and water collection point.", timestamps:[{t:"0:06",label:"Drone lifts off over village"},{t:"0:19",label:"Borehole comes into frame"},{t:"0:33",label:"People queue at the water tank"}], kw:["drone","water","rural","community","kano"] },
  { id:"a8", name:"IMG_3390.HEIC", type:"photo", icon:"baby", project:"UNICEF", location:"Lagos", date:"2025-02-05", camera:"iPhone 15 Pro", lens:"Main 24mm", orientation:"Portrait", objects:["mother","baby","wrapper cloth"], activity:"Carrying baby", environment:"Market street", colorTheme:"Vibrant", subjects:["mother","baby"], people:[], caption:"A mother carries her baby on her back, wrapped in colourful cloth.", kw:["mother","woman","child","community","lagos"] },
  { id:"a9", name:"TRC_field_06.MP4", type:"video", duration:"1:12", icon:"women", project:"TracTrac", location:"Kano", date:"2025-03-13", camera:"Canon R5", lens:"24-70mm f/2.8", orientation:"Landscape", objects:["women","hoes","crops","field"], activity:"Women farming together", environment:"Vegetable plot", colorTheme:"Green", subjects:["women","farmers"], people:[], caption:"A group of women farmers tend rows of vegetables, talking as they work.", timestamps:[{t:"0:11",label:"Wide shot of the field"},{t:"0:40",label:"Close-up of hands planting"},{t:"1:02",label:"Women laughing together"}], kw:["woman","farming","agriculture-crop","kano"] },
  { id:"a10", name:"WHO_outreach_22.JPG", type:"photo", icon:"community", project:"WHO", location:"Abuja", date:"2025-01-24", camera:"Sony A7 IV", lens:"16-35mm f/2.8", orientation:"Landscape", objects:["crowd","tent","banners","chairs"], activity:"Community outreach", environment:"Town square", colorTheme:"Neutral", subjects:["community"], people:[], caption:"A large crowd gathers under banners during a community health outreach.", kw:["community","health","abuja"] },
  { id:"a11", name:"TRC_tractor_03.MP4", type:"video", duration:"0:36", icon:"tractor", project:"TracTrac", location:"Kano", date:"2025-03-12", camera:"Canon R5", lens:"24-70mm f/2.8", orientation:"Landscape", objects:["tractor","dust","field"], activity:"Tractor moving", environment:"Open farmland", colorTheme:"Dust / Gold", subjects:["tractor","farmer"], people:[], caption:"A tractor moves steadily across the field, kicking up a trail of dust.", timestamps:[{t:"0:03",label:"Tractor enters frame"},{t:"0:18",label:"Tractor turns at row end"},{t:"0:30",label:"Driver waves at camera"}], kw:["tractor","farming","rural","kano"] },
  { id:"a12", name:"TRC_planting_09.MP4", type:"video", duration:"0:54", icon:"planting", project:"TracTrac", location:"Lagos", date:"2025-02-06", camera:"Sony A7 IV", lens:"90mm macro", orientation:"Landscape", objects:["seeds","hands","soil","seedling"], activity:"Planting seeds", environment:"Tilled soil", colorTheme:"Earth / Green", subjects:["farmer"], people:[], caption:"Close-up of weathered hands pressing seeds into freshly tilled soil.", timestamps:[{t:"0:08",label:"Hands open the seed pouch"},{t:"0:25",label:"Seeds dropped into furrow"},{t:"0:44",label:"Soil covered over"}], kw:["farming","agriculture-crop","lagos"] },
  { id:"a13", name:"IMG_6671.HEIC", type:"photo", icon:"water", project:"UNICEF", location:"Kano", date:"2025-03-14", camera:"iPhone 15 Pro", lens:"Main 24mm", orientation:"Portrait", objects:["hand pump","jerry can","child","water"], activity:"Fetching water", environment:"Borehole site", colorTheme:"Blue", subjects:["child","water project"], people:[], caption:"A child fills a yellow jerry can at a freshly installed hand pump.", kw:["water","child","community","kano"] },
  { id:"a14", name:"DJI_0207.JPG", type:"photo", icon:"sunrise", project:"Personal", location:"Abuja", date:"2024-12-30", camera:"DJI Mavic 3", lens:"24mm wide", orientation:"Landscape", objects:["sunrise","fields","mist","hills"], activity:"Aerial landscape", environment:"Farmland at dawn", colorTheme:"Sunrise", subjects:["landscape"], people:[], caption:"Drone captures golden sunrise mist drifting over open farmland.", kw:["drone","sunrise","rural","abuja"] },
  { id:"a15", name:"UNI_child_44.MP4", type:"video", duration:"0:22", icon:"laugh", project:"UNICEF", location:"Lagos", date:"2025-02-05", camera:"Sony A7 IV", lens:"50mm f/1.8", orientation:"Portrait", objects:["child","laughter","play"], activity:"Child laughing", environment:"Courtyard", colorTheme:"Warm / Green", subjects:["child"], people:[], caption:"A child bursts into laughter while playing in a sunlit courtyard.", timestamps:[{t:"0:04",label:"Child looks at camera"},{t:"0:11",label:"Child starts laughing"},{t:"0:18",label:"Runs out of frame"}], kw:["child","smiling","community","lagos"] },
  { id:"a16", name:"IMG_5712.CR3", type:"photo", icon:"maize", project:"TracTrac", location:"Kano", date:"2025-03-13", camera:"Canon R5", lens:"16-35mm f/2.8", orientation:"Landscape", objects:["maize field","sky","horizon"], activity:"Landscape", environment:"Maize farm", colorTheme:"Golden", subjects:["landscape"], people:[], caption:"Rows of tall maize stretch toward the horizon under a wide blue sky.", kw:["agriculture-crop","maize","farming","rural","kano"] },
  { id:"a17", name:"WHO_tent_31.JPG", type:"photo", icon:"health", project:"WHO", location:"Abuja", date:"2025-01-24", camera:"Sony A7 IV", lens:"35mm f/1.8", orientation:"Landscape", objects:["medical tent","table","supplies","staff"], activity:"Health campaign setup", environment:"Campaign ground", colorTheme:"Clinical", subjects:["health worker"], people:[], caption:"Staff arrange supplies on tables at a health campaign tent.", kw:["health","community","abuja"] },
  { id:"a18", name:"DJI_0301.JPG", type:"photo", icon:"village", project:"Personal", location:"Kano", date:"2024-12-31", camera:"DJI Mavic 3", lens:"24mm wide", orientation:"Landscape", objects:["rooftops","compound","trees","paths"], activity:"Aerial survey", environment:"Village compound", colorTheme:"Sand / Sky", subjects:["community","landscape"], people:[], caption:"Top-down drone shot of clustered village rooftops and winding footpaths.", kw:["drone","village","rural","community","kano"] },
];

const ICONS = { tractor:Tractor, drone:Plane, football:Users, elderly:Users, maize:Wheat, health:HeartPulse, water:Droplet, baby:Baby, women:Users, community:Users, planting:Sprout, sunrise:Sun, village:Plane, laugh:Baby };

const COLLECTIONS = [
  { id:"women-ag", name:"Women in Agriculture", icon:Wheat, match:a=>a.kw.includes("woman")&&a.kw.includes("farming") },
  { id:"drone", name:"Drone Photography", icon:Plane, match:a=>a.kw.includes("drone") },
  { id:"health", name:"Health Campaigns", icon:HeartPulse, match:a=>a.kw.includes("health") },
  { id:"outreach", name:"Community Outreach", icon:Users, match:a=>a.kw.includes("community") },
  { id:"water", name:"Water Projects", icon:Droplet, match:a=>a.kw.includes("water") },
];

const FOLDERS = [
  { label:"Projects", icon:Folder, children:[
    { label:"UNICEF", type:"project", value:"UNICEF" },{ label:"WHO", type:"project", value:"WHO" },
    { label:"TracTrac", type:"project", value:"TracTrac" },{ label:"Personal", type:"project", value:"Personal" }]},
  { label:"Locations", icon:MapPin, children:[
    { label:"Abuja", type:"location", value:"Abuja" },{ label:"Kano", type:"location", value:"Kano" },{ label:"Lagos", type:"location", value:"Lagos" }]},
  { label:"Media", icon:Layers, children:[
    { label:"Photos", type:"mediatype", value:"photo" },{ label:"Videos", type:"mediatype", value:"video" },{ label:"Drone", type:"drone", value:"drone" }]},
];

const SOURCES = [
  { id:"gdrive", name:"Google Drive", icon:Cloud, connected:true, count:842 },
  { id:"dropbox", name:"Dropbox", icon:Cloud, connected:true, count:311 },
  { id:"onedrive", name:"OneDrive", icon:Cloud, connected:false, count:0 },
  { id:"s3", name:"AWS S3", icon:Database, connected:false, count:0 },
  { id:"nas", name:"NAS Server", icon:HardDrive, connected:true, count:1290 },
];

const SUGGESTIONS = ["drone shots from Kano","women farmers","health worker vaccinating a child","mother carrying baby","water project footage","children playing football"];

/* ----------------------------- ORGANIZATIONS ----------------------------- */

const ORGS = [
  { id:"hope", name:"Hope Foundation", initials:"HF", plan:"NGO · Team",
    stats:{ assets:"4,128", storage:"312 GB", tagged:"98%", collections:14, members:9 },
    byProject:[["Health Campaigns",1240],["Water Projects",980],["Community Outreach",760],["Field Reports",640],["Other",508]],
    uploads:[120,180,150,260,210,340],
    topTags:[["drone",420],["children",380],["water",310],["health",290],["women",240],["rural",210]],
    members:["Amara O.","David K.","Sarah M.","Ngozi A.","Tunde B."],
    activity:[
      {who:"Amara O.",act:"uploaded 32 photos to Water Projects",t:"12m ago"},
      {who:"AI",act:"auto-tagged 32 new assets",t:"12m ago"},
      {who:"David K.",act:"created collection \u201cBorehole Sites\u201d",t:"1h ago"},
      {who:"Sarah M.",act:"shared 8 assets to a client portal",t:"3h ago"},
      {who:"AI",act:"flagged 14 duplicate photos",t:"yesterday"} ]},
  { id:"tractrac", name:"TracTrac Agritech", initials:"TT", plan:"Business",
    stats:{ assets:"2,860", storage:"540 GB", tagged:"95%", collections:8, members:5 },
    byProject:[["Field Operations",1100],["Drone Surveys",820],["Women in Ag",520],["Marketing",420]],
    uploads:[90,140,200,180,240,300],
    topTags:[["tractor",380],["maize",340],["drone",300],["farming",280],["women",190],["harvest",160]],
    members:["Ibrahim S.","Funke A.","Musa D.","Grace E."],
    activity:[
      {who:"Ibrahim S.",act:"uploaded a drone survey set (48 files)",t:"25m ago"},
      {who:"AI",act:"indexed 48 assets across 2 sources",t:"24m ago"},
      {who:"Funke A.",act:"edited tags on 12 harvest photos",t:"2h ago"},
      {who:"AI",act:"matched 60 assets to \u201cWomen in Ag\u201d",t:"5h ago"},
      {who:"Musa D.",act:"connected an external NAS drive",t:"yesterday"} ]},
  { id:"who", name:"WHO Field Office", initials:"WO", plan:"Enterprise",
    stats:{ assets:"6,740", storage:"1.2 TB", tagged:"99%", collections:22, members:18 },
    byProject:[["Vaccination",2100],["Outreach",1600],["Clinics",1400],["Training",980],["Other",660]],
    uploads:[300,280,360,420,390,520],
    topTags:[["health",640],["vaccination",520],["children",480],["community",420],["clinic",300],["elderly",220]],
    members:["Dr. Chito","Aisha L.","Peter N.","Rita O.","Sam K.","Joy U."],
    activity:[
      {who:"Dr. Chito",act:"uploaded campaign footage (12 clips)",t:"8m ago"},
      {who:"AI",act:"generated captions for 12 videos",t:"7m ago"},
      {who:"Aisha L.",act:"created collection \u201cCold Chain\u201d",t:"40m ago"},
      {who:"AI",act:"detected faces in 96 photos",t:"2h ago"},
      {who:"Peter N.",act:"exported a project report",t:"yesterday"} ]},
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun"];

/* ----------------------------- SEARCH ENGINE ----------------------------- */

const STOP = new Set(["show","me","all","find","the","of","from","with","and","a","an","in","on","taken","during","please","get","containing","contain","that","is","are","for","photos","pictures","videos"]);
const SYN = { woman:"woman",women:"woman",female:"woman",lady:"woman",ladies:"woman",girl:"woman", farmer:"farming",farmers:"farming",farming:"farming",agriculture:"farming",agricultural:"farming",farm:"farming",harvest:"agriculture-crop",harvesting:"agriculture-crop",maize:"agriculture-crop",corn:"agriculture-crop",crop:"agriculture-crop",crops:"agriculture-crop",planting:"agriculture-crop",seeds:"agriculture-crop",plant:"agriculture-crop", drone:"drone",aerial:"drone",uav:"drone",flyover:"drone", video:"__video",footage:"__video",clip:"__video",clips:"__video",film:"__video", photo:"__photo",picture:"__photo",pic:"__photo",pics:"__photo",image:"__photo",photograph:"__photo", child:"child",children:"child",kid:"child",kids:"child",baby:"mother",babies:"mother",infant:"mother", football:"football",soccer:"football",playing:"football",play:"football", elderly:"elderly",old:"elderly",senior:"elderly",grandmother:"elderly",grandma:"elderly", smiling:"smiling",smile:"smiling",happy:"smiling",laughing:"smiling",laugh:"smiling",joy:"smiling", mother:"mother",mom:"mother",mum:"mother",carrying:"mother", health:"health",vaccine:"health",vaccinating:"health",vaccination:"health",worker:"health",medical:"health",nurse:"health",doctor:"health",clinic:"health", water:"water",borehole:"water",well:"water",pump:"water",tap:"water",jerry:"water", tractor:"tractor", community:"community",outreach:"community",gathering:"community",crowd:"community",meeting:"community", village:"village",rural:"rural", sunrise:"sunrise",sunset:"sunrise",sun:"sunrise",dawn:"sunrise", kano:"@kano",abuja:"@abuja",lagos:"@lagos" };

function searchAssets(query, assets) {
  const q = query.trim().toLowerCase();
  if (!q) return assets;
  const tokens = (q.match(/[a-z]+/g)||[]).filter(t=>t.length>1 && !STOP.has(t));
  if (!tokens.length) return assets;
  return assets.map(a=>{
    let score=0;
    const hay=(a.kw.join(" ")+" "+a.objects.join(" ")+" "+a.activity+" "+a.caption+" "+a.environment).toLowerCase();
    tokens.forEach(tok=>{
      const base=SYN[tok]||SYN[tok.replace(/s$/,"")]||tok.replace(/s$/,"");
      if(base==="__video"){ if(a.type==="video")score+=3; return; }
      if(base==="__photo"){ if(a.type==="photo")score+=2; return; }
      if(base.startsWith("@")){ if(a.location.toLowerCase()===base.slice(1))score+=3; return; }
      if(a.kw.includes(base))score+=3; else if(hay.includes(base))score+=2; else if(hay.includes(tok))score+=1;
    });
    return {a,score};
  }).filter(x=>x.score>0).sort((x,y)=>y.score-x.score).map(x=>x.a);
}

function captionVariants(a){
  const b=a.caption;
  return { Description:b, Documentary:`${b.replace(/\.$/,"")} \u2014 documented in ${a.location} as part of the ${a.project} field programme.`, Social:`${b.replace(/\.$/,"")}. Stories from the field. #${a.project} #${a.location} #StoryVault`, "Alt text":`Photo: ${b.toLowerCase()}` };
}

/* ----------------------------- SHARED UI ----------------------------- */

function Thumb({ a, size }) {
  const Icon = ICONS[a.icon] || ImageIcon;
  return (
    <div className="relative w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden">
      <Icon className="text-slate-400" size={size||38} strokeWidth={1.4} />
      {a.type==="video" && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-slate-900/75 text-white text-xs px-1.5 py-0.5 rounded">
          <Play size={10} className="fill-white" /> {a.duration}
        </div>
      )}
    </div>
  );
}

function AssetCard({ a, onClick }) {
  return (
    <button onClick={onClick} className="group text-left rounded-lg overflow-hidden border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition">
      <div className="aspect-[4/3]"><Thumb a={a} /></div>
      <div className="p-2.5">
        <div className="flex items-center gap-1.5 text-slate-700">
          {a.type==="video"?<Video size={13}/>:<ImageIcon size={13}/>}
          <span className="text-xs font-medium truncate">{a.name}</span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
          <span className="flex items-center gap-0.5"><MapPin size={10}/>{a.location}</span>
          <span className="flex items-center gap-0.5"><Folder size={10}/>{a.project}</span>
        </div>
      </div>
    </button>
  );
}

function Chip({ label, onClear, icon:Icon }) {
  return (
    <span className="flex items-center gap-1 bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-full">
      {Icon && <Icon size={11}/>}{label}
      {onClear && <button onClick={onClear} className="hover:text-slate-900"><X size={11}/></button>}
    </span>
  );
}

/* ----------------------------- MAIN APP ----------------------------- */

export default function StoryVaultAI() {
  const [assets, setAssets] = useState(ASSETS);
  const [section, setSection] = useState("dashboard");
  const [orgId, setOrgId] = useState("hope");
  const [orgMenu, setOrgMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState(null);
  const [collection, setCollection] = useState(null);
  const [folder, setFolder] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ project:"",location:"",camera:"",type:"",orientation:"" });
  const [openFolders, setOpenFolders] = useState({ Projects:true, Locations:false, Media:false });
  const [sources, setSources] = useState(SOURCES);
  const [showUpload, setShowUpload] = useState(false);
  const [captionTab, setCaptionTab] = useState("Description");
  const [faceOn, setFaceOn] = useState(true);
  const [videoMark, setVideoMark] = useState(null);
  const [copied, setCopied] = useState(false);

  const org = ORGS.find(o=>o.id===orgId);
  const triggerSearch=(q)=>{ setQuery(q); setSearching(true); setSection("library"); setTimeout(()=>setSearching(false),360); };

  const results = useMemo(()=>{
    let list=assets;
    if(folder) list=list.filter(a=>{
      if(folder.type==="project")return a.project===folder.value;
      if(folder.type==="location")return a.location===folder.value;
      if(folder.type==="mediatype")return a.type===folder.value;
      if(folder.type==="drone")return a.kw.includes("drone");
      return true; });
    if(collection){ const c=COLLECTIONS.find(x=>x.id===collection); if(c) list=list.filter(c.match); }
    if(filters.project)list=list.filter(a=>a.project===filters.project);
    if(filters.location)list=list.filter(a=>a.location===filters.location);
    if(filters.camera)list=list.filter(a=>a.camera===filters.camera);
    if(filters.type)list=list.filter(a=>a.type===filters.type);
    if(filters.orientation)list=list.filter(a=>a.orientation===filters.orientation);
    return searchAssets(query,list);
  },[assets,query,collection,folder,filters]);

  const activeCount=sources.filter(s=>s.connected).length;
  const cameras=[...new Set(assets.map(a=>a.camera))];
  const collectionName=collection?COLLECTIONS.find(c=>c.id===collection)?.name:null;
  const filterChips=Object.entries(filters).filter(([,v])=>v);
  const clearContext=()=>{ setQuery("");setCollection(null);setFolder(null);setFilters({project:"",location:"",camera:"",type:"",orientation:""}); };
  const navTo=(updater)=>{ setSection("library"); updater(); };

  const simulateUpload=()=>{
    const id="u"+Date.now();
    setAssets(p=>[{ id,name:`NEW_${Math.floor(Math.random()*9000+1000)}.JPG`,type:"photo",icon:"drone",project:"Personal",location:"Kano",date:"2025-06-06",camera:"DJI Mavic 3",lens:"24mm wide",orientation:"Landscape",objects:["analyzing..."],activity:"Analyzing",environment:"\u2014",colorTheme:"\u2014",subjects:[],people:[],caption:"Analyzing image with AI\u2026",kw:[],analyzing:true },...p]);
    setShowUpload(false); setSection("library");
    setTimeout(()=>setAssets(p=>p.map(a=>a.id===id?{...a,objects:["village","fields","rooftops"],activity:"Aerial survey",environment:"Rural community",colorTheme:"\u2014",subjects:["community"],caption:"Drone view of a rural community at midday.",kw:["drone","rural","community","kano"],analyzing:false}:a)),1600);
  };

  return (
    <div className="flex h-[780px] w-full bg-slate-50 text-slate-800 rounded-xl overflow-hidden border border-slate-200 font-sans">
      {/* SIDEBAR */}
      <aside className="w-60 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="px-3 py-3 border-b border-slate-100 relative">
          <button onClick={()=>setOrgMenu(v=>!v)} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white text-xs font-semibold flex items-center justify-center">{org.initials}</div>
            <div className="text-left min-w-0 flex-1">
              <div className="text-sm font-semibold truncate">{org.name}</div>
              <div className="text-[10px] text-slate-400">{org.plan}</div>
            </div>
            <ChevronDown size={15} className="text-slate-400"/>
          </button>
          {orgMenu && (
            <div className="absolute left-3 right-3 top-16 bg-white border border-slate-200 rounded-lg shadow-lg z-30 py-1">
              <div className="px-3 py-1 text-[10px] uppercase tracking-wide text-slate-400">Organizations</div>
              {ORGS.map(o=>(
                <button key={o.id} onClick={()=>{setOrgId(o.id);setOrgMenu(false);}} className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 text-left">
                  <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold flex items-center justify-center">{o.initials}</div>
                  <span className="text-sm flex-1 truncate">{o.name}</span>
                  {o.id===orgId && <Check size={14} className="text-slate-900"/>}
                </button>
              ))}
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 text-left text-sm text-slate-500"><Plus size={14}/> Add organization</button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 text-sm">
          <div className="space-y-0.5">
            <NavItem active={section==="dashboard"} icon={LayoutDashboard} label="Dashboard" onClick={()=>setSection("dashboard")}/>
            <NavItem active={section==="library"&&!collection&&!folder} icon={LayoutGrid} label="Library" right={assets.length} onClick={()=>{setSection("library");clearContext();}}/>
          </div>

          <div>
            <SideHeader icon={Sparkles}>Smart Collections</SideHeader>
            {COLLECTIONS.map(c=>{ const Icon=c.icon; const n=assets.filter(c.match).length; return (
              <SideRow key={c.id} active={section==="library"&&collection===c.id} icon={Icon} label={c.name} right={n} onClick={()=>navTo(()=>{setCollection(c.id);setFolder(null);})}/>
            );})}
          </div>

          <div>
            <SideHeader>Folders</SideHeader>
            {FOLDERS.map(f=>{ const Icon=f.icon; const open=openFolders[f.label]; return (
              <div key={f.label}>
                <button onClick={()=>setOpenFolders(p=>({...p,[f.label]:!p[f.label]}))} className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50">
                  {open?<ChevronDown size={13}/>:<ChevronRight size={13}/>} {open?<FolderOpen size={15}/>:<Icon size={15}/>} {f.label}
                </button>
                {open && f.children.map(ch=>(
                  <button key={ch.label} onClick={()=>navTo(()=>{setFolder(ch);setCollection(null);})} className={`w-full flex items-center gap-2 pl-9 pr-2.5 py-1.5 rounded-lg text-[13px] ${section==="library"&&folder&&folder.value===ch.value&&folder.type===ch.type?"bg-slate-100 text-slate-900 font-medium":"text-slate-500 hover:bg-slate-50"}`}>{ch.label}</button>
                ))}
              </div>
            );})}
          </div>

          <div>
            <SideHeader>Connected Sources</SideHeader>
            {sources.map(s=>{ const Icon=s.icon; return (
              <button key={s.id} onClick={()=>setSources(p=>p.map(x=>x.id===s.id?{...x,connected:!x.connected}:x))} className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50">
                <Icon size={15} className={s.connected?"text-slate-700":"text-slate-300"}/>
                <span className="text-[13px]">{s.name}</span>
                {s.connected?<Check size={13} className="ml-auto text-slate-500"/>:<Plus size={13} className="ml-auto text-slate-300"/>}
              </button>
            );})}
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col min-w-0">
        {section==="dashboard" ? (
          <Dashboard org={org} sources={sources} onOpenLibrary={()=>setSection("library")} onUpload={()=>setShowUpload(true)}/>
        ) : (
          <>
            <div className="px-5 pt-4 pb-3 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-2.5 text-slate-400"/>
                  <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")triggerSearch(query);}}
                    placeholder="Ask in plain language\u2026  e.g. \u201cdrone shots from Kano\u201d"
                    className="w-full pl-9 pr-9 py-2 rounded-lg bg-slate-100 focus:bg-white border border-transparent focus:border-slate-400 outline-none text-sm"/>
                  {query && <button onClick={()=>setQuery("")} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"><X size={15}/></button>}
                </div>
                <button onClick={()=>setShowFilters(v=>!v)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm ${showFilters||filterChips.length?"border-slate-400 text-slate-900 bg-slate-100":"border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                  <Filter size={15}/> Filters {filterChips.length>0 && <span className="bg-slate-900 text-white rounded-full text-[10px] px-1.5">{filterChips.length}</span>}
                </button>
                <button onClick={()=>setShowUpload(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-slate-800"><Upload size={15}/> Upload</button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                <span className="text-[11px] text-slate-400 self-center flex items-center gap-1"><Sparkles size={11}/> Try:</span>
                {SUGGESTIONS.map(s=>(<button key={s} onClick={()=>triggerSearch(s)} className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">{s}</button>))}
              </div>
              {showFilters && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
                  {[["project","Project",["UNICEF","WHO","TracTrac","Personal"]],["location","Location",["Abuja","Kano","Lagos"]],["camera","Camera",cameras],["type","Type",[["photo","Photo"],["video","Video"]]],["orientation","Orientation",["Landscape","Portrait"]]].map(([key,label,opts])=>(
                    <select key={key} value={filters[key]} onChange={e=>setFilters(f=>({...f,[key]:e.target.value}))} className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 outline-none focus:border-slate-400">
                      <option value="">{label}: All</option>
                      {opts.map(o=>Array.isArray(o)?<option key={o[0]} value={o[0]}>{o[1]}</option>:<option key={o} value={o}>{o}</option>)}
                    </select>
                  ))}
                  {filterChips.length>0 && <button onClick={()=>setFilters({project:"",location:"",camera:"",type:"",orientation:""})} className="text-xs text-slate-400 hover:text-slate-600 px-2">Clear</button>}
                </div>
              )}
            </div>

            <div className="px-5 py-2.5 flex items-center gap-3 bg-white border-b border-slate-100">
              <div className="flex items-center gap-2 flex-1 flex-wrap text-sm">
                <span className="text-slate-500">{searching?"Searching\u2026":`${results.length} ${results.length===1?"result":"results"}`}</span>
                {searching && <span className="w-3.5 h-3.5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"/>}
                {query && <Chip label={`\u201c${query}\u201d`} onClear={()=>setQuery("")} icon={Search}/>}
                {collectionName && <Chip label={collectionName} onClear={()=>setCollection(null)} icon={Sparkles}/>}
                {folder && <Chip label={folder.label} onClear={()=>setFolder(null)} icon={Folder}/>}
                <span className="text-[11px] text-slate-400 ml-1">\u00b7 {activeCount} sources connected</span>
              </div>
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                {[["grid",LayoutGrid],["timeline",Clock],["map",Map]].map(([v,Icon])=>(
                  <button key={v} onClick={()=>setView(v)} className={`p-1.5 rounded-md ${view===v?"bg-white shadow-sm text-slate-900":"text-slate-400 hover:text-slate-600"}`}><Icon size={16}/></button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {results.length===0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                  <Search size={32} className="mb-3 opacity-40"/>
                  <p className="text-sm">No matches for that search.</p>
                  <p className="text-xs mt-1">Try \u201cvaccination\u201d, \u201cdrone\u201d, or \u201cwomen farmers\u201d.</p>
                </div>
              ) : view==="grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
                  {results.map(a=>a.analyzing
                    ? <div key={a.id} className="rounded-lg overflow-hidden border border-slate-200 bg-white">
                        <div className="aspect-[4/3] bg-slate-100 flex flex-col items-center justify-center gap-2 text-slate-400">
                          <span className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"/>
                          <span className="text-xs flex items-center gap-1"><Sparkles size={12}/> AI analyzing\u2026</span>
                        </div>
                        <div className="p-2.5 text-xs text-slate-400 truncate">{a.name}</div>
                      </div>
                    : <AssetCard key={a.id} a={a} onClick={()=>{setSelected(a);setCaptionTab("Description");setVideoMark(null);}}/>)}
                </div>
              ) : view==="timeline" ? (
                <TimelineView results={results} onPick={a=>{setSelected(a);setVideoMark(null);}}/>
              ) : (
                <MapView results={results} onPick={a=>{setSelected(a);setVideoMark(null);}}/>
              )}
            </div>
          </>
        )}
      </main>

      {selected && <DetailPanel a={selected} onClose={()=>setSelected(null)} captionTab={captionTab} setCaptionTab={setCaptionTab} faceOn={faceOn} setFaceOn={setFaceOn} videoMark={videoMark} setVideoMark={setVideoMark} copied={copied} setCopied={setCopied}/>}

      {showUpload && (
        <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center z-40" onClick={()=>setShowUpload(false)}>
          <div className="bg-white rounded-xl w-96 p-6 shadow-xl" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2"><Upload size={17}/> Upload media</h3>
              <button onClick={()=>setShowUpload(false)} className="text-slate-400 hover:text-slate-600"><X size={18}/></button>
            </div>
            <div className="border-2 border-dashed border-slate-200 rounded-lg py-9 text-center text-slate-400">
              <Upload size={26} className="mx-auto mb-2 opacity-50"/>
              <p className="text-sm">Drag & drop photos or videos</p>
              <p className="text-xs mt-1">StoryVault AI will auto-tag and index them</p>
            </div>
            <button onClick={simulateUpload} className="w-full mt-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm hover:bg-slate-800 flex items-center justify-center gap-2"><Sparkles size={15}/> Simulate AI analysis</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- SIDEBAR HELPERS ----------------------------- */
function NavItem({ active, icon:Icon, label, right, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg ${active?"bg-slate-100 text-slate-900 font-medium":"text-slate-600 hover:bg-slate-50"}`}>
      <Icon size={15}/> {label} {right!=null && <span className="ml-auto text-xs text-slate-400">{right}</span>}
    </button>
  );
}
function SideRow({ active, icon:Icon, label, right, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg ${active?"bg-slate-100 text-slate-900 font-medium":"text-slate-600 hover:bg-slate-50"}`}>
      <Icon size={15}/> <span className="truncate">{label}</span> {right!=null && <span className="ml-auto text-xs text-slate-400">{right}</span>}
    </button>
  );
}
function SideHeader({ icon:Icon, children }) {
  return <div className="px-2.5 mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400 flex items-center gap-1">{Icon && <Icon size={11}/>} {children}</div>;
}

/* ----------------------------- DASHBOARD ----------------------------- */

function Dashboard({ org, sources, onOpenLibrary, onUpload }) {
  const maxUp = Math.max(...org.uploads);
  const maxProj = Math.max(...org.byProject.map(p=>p[1]));
  const totalProj = org.byProject.reduce((s,p)=>s+p[1],0);
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="px-6 pt-5 pb-4 bg-white border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-400">{org.name} \u00b7 workspace overview</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onOpenLibrary} className="text-sm px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"><LayoutGrid size={15}/> Open Library</button>
          <button onClick={onUpload} className="text-sm px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1.5"><Upload size={15}/> Upload</button>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi icon={ImageIcon} label="Total assets" value={org.stats.assets} sub="+312 this month"/>
          <Kpi icon={Storage} label="Storage used" value={org.stats.storage} sub="of 2 TB plan"/>
          <Kpi icon={Sparkles} label="AI-tagged" value={org.stats.tagged} sub="auto-indexed"/>
          <Kpi icon={Layers} label="Collections" value={org.stats.collections} sub="auto-updating"/>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <Card title="Uploads \u2014 last 6 months" right={<span className="text-xs text-slate-400 flex items-center gap-1"><TrendingUp size={12}/> trending up</span>}>
              <div className="flex items-end gap-3 h-36 pt-2">
                {org.uploads.map((v,i)=>(
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full bg-slate-900 rounded-t-md transition-all" style={{height:`${(v/maxUp)*100}%`}}/>
                    <span className="text-[11px] text-slate-400">{MONTHS[i]}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Assets by project">
              <div className="space-y-2.5">
                {org.byProject.map(([name,v])=>(
                  <div key={name}>
                    <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">{name}</span><span className="text-slate-400">{v.toLocaleString()} \u00b7 {Math.round(v/totalProj*100)}%</span></div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-slate-700 rounded-full" style={{width:`${(v/maxProj)*100}%`}}/></div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Recent activity">
              <div className="space-y-3">
                {org.activity.map((e,i)=>(
                  <div key={i} className="flex items-start gap-2.5 text-sm">
                    <div className={`mt-0.5 w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-semibold ${e.who==="AI"?"bg-slate-900 text-white":"bg-slate-100 text-slate-600"}`}>{e.who==="AI"?<Sparkles size={12}/>:e.who[0]}</div>
                    <div className="flex-1">
                      <p className="text-slate-600"><span className="font-medium text-slate-800">{e.who}</span> {e.act}</p>
                      <p className="text-[11px] text-slate-400">{e.t}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-5">
            <Card title="Connected sources">
              <div className="space-y-2">
                {sources.map(s=>{ const Icon=s.icon; return (
                  <div key={s.id} className="flex items-center gap-2 text-sm">
                    <Icon size={15} className={s.connected?"text-slate-700":"text-slate-300"}/>
                    <span className="text-slate-600 flex-1">{s.name}</span>
                    {s.connected ? <span className="text-[11px] text-slate-400">{s.count.toLocaleString()}</span> : <span className="text-[11px] text-slate-300">off</span>}
                  </div>
                );})}
              </div>
            </Card>

            <Card title="Top AI tags">
              <div className="flex flex-wrap gap-1.5">
                {org.topTags.map(([t,n])=>(
                  <span key={t} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">{t} <span className="text-slate-400">{n}</span></span>
                ))}
              </div>
            </Card>

            <Card title={`Team \u00b7 ${org.stats.members} members`}>
              <div className="flex flex-wrap items-center gap-1.5">
                {org.members.map((m,i)=>(
                  <span key={i} className="flex items-center gap-1.5 text-xs bg-slate-50 border border-slate-200 px-2 py-1 rounded-full">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center">{m[0]}</span>{m}
                  </span>
                ))}
                {org.stats.members>org.members.length && <span className="text-xs text-slate-400">+{org.stats.members-org.members.length} more</span>}
                <button className="w-7 h-7 rounded-full border border-dashed border-slate-300 text-slate-400 flex items-center justify-center hover:border-slate-400"><Plus size={13}/></button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ icon:Icon, label, value, sub }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400">{label}</span>
        <Icon size={15} className="text-slate-300"/>
      </div>
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-0.5"><ArrowUpRight size={11}/> {sub}</div>
    </div>
  );
}
function Card({ title, right, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-700">{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}

/* ----------------------------- TIMELINE / MAP ----------------------------- */

function TimelineView({ results, onPick }) {
  const groups=useMemo(()=>{ const m={}; [...results].sort((a,b)=>b.date.localeCompare(a.date)).forEach(a=>{(m[a.date]=m[a.date]||[]).push(a);}); return Object.entries(m); },[results]);
  return (
    <div className="space-y-6">
      {groups.map(([date,items])=>(
        <div key={date}>
          <div className="flex items-center gap-2 mb-2.5 text-sm font-medium text-slate-600"><Calendar size={14}/> {new Date(date).toLocaleDateString(undefined,{weekday:"short",month:"long",day:"numeric",year:"numeric"})} <span className="text-xs text-slate-400 font-normal">{items.length} items</span></div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 pl-1">
            {items.map(a=>(<button key={a.id} onClick={()=>onPick(a)} className="aspect-square rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 transition"><Thumb a={a} size={26}/></button>))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MapView({ results, onPick }) {
  const PINS={ Abuja:{x:50,y:46}, Kano:{x:56,y:24}, Lagos:{x:24,y:74} };
  const byLoc=useMemo(()=>{ const m={}; results.forEach(a=>{(m[a.location]=m[a.location]||[]).push(a);}); return m; },[results]);
  return (
    <div className="h-full flex gap-4">
      <div className="relative flex-1 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden min-h-[300px]">
        <div className="absolute inset-0 opacity-60" style={{backgroundImage:"radial-gradient(circle at 40% 40%, #e2e8f0 0%, transparent 45%), radial-gradient(circle at 70% 65%, #e2e8f0 0%, transparent 45%)"}}/>
        <div className="absolute top-3 left-3 text-xs text-slate-500 flex items-center gap-1"><Map size={13}/> Nigeria \u2014 geotagged media</div>
        {Object.entries(byLoc).map(([loc,items])=>{ const p=PINS[loc]||{x:50,y:50}; return (
          <div key={loc} className="absolute -translate-x-1/2 -translate-y-1/2" style={{left:`${p.x}%`,top:`${p.y}%`}}>
            <button onClick={()=>onPick(items[0])} className="flex flex-col items-center">
              <span className="relative flex items-center justify-center">
                <span className="absolute w-10 h-10 rounded-full bg-slate-400 opacity-25 animate-ping"/>
                <span className="relative w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shadow ring-2 ring-white">{items.length}</span>
              </span>
              <span className="mt-1 text-[11px] font-medium text-slate-700 bg-white/80 px-1.5 rounded">{loc}</span>
            </button>
          </div>
        );})}
      </div>
      <div className="w-52 shrink-0 overflow-y-auto space-y-2">
        {results.slice(0,12).map(a=>(
          <button key={a.id} onClick={()=>onPick(a)} className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-slate-200">
            <div className="w-10 h-10 rounded-md overflow-hidden shrink-0"><Thumb a={a} size={16}/></div>
            <div className="text-left min-w-0"><div className="text-xs font-medium truncate">{a.location}</div><div className="text-[11px] text-slate-400 truncate">{a.activity}</div></div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- DETAIL PANEL ----------------------------- */

function DetailPanel({ a, onClose, captionTab, setCaptionTab, faceOn, setFaceOn, videoMark, setVideoMark, copied, setCopied }) {
  const caps=captionVariants(a);
  const copyCap=()=>{ setCopied(true); setTimeout(()=>setCopied(false),1200); };
  return (
    <div className="absolute right-0 top-0 h-full w-[400px] bg-white border-l border-slate-200 shadow-xl flex flex-col z-30">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <span className="text-sm font-medium truncate flex items-center gap-1.5">{a.type==="video"?<Video size={14}/>:<ImageIcon size={14}/>} {a.name}</span>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><X size={18}/></button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="aspect-[4/3] relative"><Thumb a={a} size={60}/>
          {a.type==="video" && <div className="absolute inset-0 flex items-center justify-center"><span className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center"><Play size={20} className="text-slate-800 fill-slate-800 ml-0.5"/></span></div>}
        </div>
        <div className="p-4 space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-1"><Sparkles size={11}/> AI Caption</span>
              <button onClick={copyCap} className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1">{copied?<><Check size={12}/>Copied</>:<><Copy size={12}/>Copy</>}</button>
            </div>
            <div className="flex gap-1 mb-2">
              {Object.keys(caps).map(k=>(<button key={k} onClick={()=>setCaptionTab(k)} className={`text-[11px] px-2 py-0.5 rounded-full ${captionTab===k?"bg-slate-900 text-white":"bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{k}</button>))}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3">{caps[captionTab]}</p>
          </div>

          {a.type==="video" && a.timestamps && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5 flex items-center gap-1"><Clock size={11}/> Detected moments</div>
              <div className="space-y-1">
                {a.timestamps.map(ts=>(
                  <button key={ts.t} onClick={()=>setVideoMark(ts)} className={`w-full flex items-center gap-2 text-left px-2.5 py-1.5 rounded-lg text-sm ${videoMark?.t===ts.t?"bg-slate-100 text-slate-900":"hover:bg-slate-50 text-slate-600"}`}>
                    <span className="font-mono text-xs bg-slate-800 text-white px-1.5 py-0.5 rounded">{ts.t}</span><span className="text-[13px]">{ts.label}</span>
                  </button>
                ))}
              </div>
              {videoMark && <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1"><Play size={10} className="fill-slate-500"/> Jumped to {videoMark.t} \u2014 \u201c{videoMark.label}\u201d</p>}
            </div>
          )}

          <TagGroup label="Objects" items={a.objects}/>
          <div className="grid grid-cols-2 gap-3">
            <Meta label="Activity" value={a.activity}/><Meta label="Environment" value={a.environment}/>
            <Meta label="Color theme" value={a.colorTheme}/><Meta label="Subjects" value={a.subjects.join(", ")||"\u2014"}/>
          </div>

          <div className="rounded-lg border border-slate-200 p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 flex items-center gap-1"><Users size={11}/> People</span>
              <button onClick={()=>setFaceOn(v=>!v)} className={`text-[11px] flex items-center gap-1 px-2 py-0.5 rounded-full ${faceOn?"bg-slate-100 text-slate-600":"bg-slate-50 text-slate-400"}`}><ShieldCheck size={11}/> Face recognition {faceOn?"on":"off"}</button>
            </div>
            {!faceOn ? <p className="text-xs text-slate-400">Face recognition is disabled for privacy.</p>
              : a.people.length ? <div className="flex flex-wrap gap-1.5">{a.people.map(p=>(<span key={p} className="flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded-full"><span className="w-5 h-5 rounded-full bg-slate-700 text-white text-[10px] flex items-center justify-center">{p[0]}</span>{p}</span>))}</div>
              : <p className="text-xs text-slate-400">No labelled people detected.</p>}
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Metadata</div>
            <div className="space-y-1 text-[13px]">
              <Row icon={Camera} label="Camera" value={a.camera}/><Row icon={ImageIcon} label="Lens" value={a.lens}/>
              <Row icon={Layers} label="Orientation" value={a.orientation}/><Row icon={MapPin} label="Location" value={a.location}/>
              <Row icon={Folder} label="Project" value={a.project}/><Row icon={Calendar} label="Date" value={a.date}/>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-slate-100 flex gap-2">
        <button className="flex-1 text-sm py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1.5"><Pencil size={14}/> Edit tags</button>
        <button className="flex-1 text-sm py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center gap-1.5"><Plus size={14}/> Add to collection</button>
      </div>
    </div>
  );
}

function TagGroup({ label, items }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5 flex items-center gap-1"><Tag size={11}/> {label} <span className="text-slate-300 normal-case font-normal">\u00b7 auto-detected</span></div>
      <div className="flex flex-wrap gap-1.5">{items.map(t=>(<span key={t} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">{t}</span>))}</div>
    </div>
  );
}
function Meta({ label, value }) { return <div><div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div><div className="text-[13px] text-slate-700">{value}</div></div>; }
function Row({ icon:Icon, label, value }) { return <div className="flex items-center gap-2"><Icon size={14} className="text-slate-400 shrink-0"/><span className="text-slate-400 w-24 shrink-0">{label}</span><span className="text-slate-700">{value}</span></div>; }
