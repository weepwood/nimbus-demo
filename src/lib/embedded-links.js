const MESSAGE_TYPE='ui-vault:external-link-blocked';

export function createEmbeddedLinkHandler({embedded=false,pageUrl,postMessage}={}){
  let pageOrigin;
  try{pageOrigin=new URL(pageUrl).origin;}catch{return ()=>false;}
  return event=>{
    if(!embedded||typeof postMessage!=='function')return false;
    const anchor=event.target?.closest?.('a[href]')||event.target?.parentElement?.closest?.('a[href]');
    if(!anchor||anchor.hasAttribute?.('download'))return false;
    let target;
    try{target=new URL(anchor.href,pageUrl);}catch{return false;}
    if(!['http:','https:'].includes(target.protocol)||target.origin===pageOrigin)return false;
    event.preventDefault();
    postMessage({type:MESSAGE_TYPE,href:target.href},'*');
    return true;
  };
}

export function installEmbeddedLinkBridge(host=window,doc=document){
  if(host.parent===host||typeof host.parent?.postMessage!=='function')return ()=>{};
  const handler=createEmbeddedLinkHandler({
    embedded:true,
    pageUrl:host.location.href,
    postMessage:(message,targetOrigin)=>host.parent.postMessage(message,targetOrigin)
  });
  doc.addEventListener('click',handler,true);
  return ()=>doc.removeEventListener('click',handler,true);
}
