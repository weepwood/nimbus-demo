import test from 'node:test';
import assert from 'node:assert/strict';
import {createEmbeddedLinkHandler} from '../src/lib/embedded-links.js';

function clickFor(anchor){
  let prevented=false;
  return {
    event:{target:{closest:selector=>selector==='a[href]'?anchor:null},preventDefault(){prevented=true;}},
    wasPrevented:()=>prevented
  };
}

test('嵌入时拦截外站 HTTP 链接并向宿主报告',()=>{
  const messages=[];
  const handler=createEmbeddedLinkHandler({
    embedded:true,pageUrl:'https://weepwood.github.io/nimbus-demo/',
    postMessage:(...args)=>messages.push(args)
  });
  const click=clickFor({href:'https://github.com/weepwood/nimbus-demo',hasAttribute:()=>false});
  assert.equal(handler(click.event),true);
  assert.equal(click.wasPrevented(),true);
  assert.deepEqual(messages,[[{
    type:'ui-vault:external-link-blocked',href:'https://github.com/weepwood/nimbus-demo'
  },'*']]);
});

test('独立访问和站内链接保持现有跳转行为',()=>{
  const handler=createEmbeddedLinkHandler({
    embedded:false,pageUrl:'https://weepwood.github.io/nimbus-demo/',postMessage(){assert.fail('不应发送消息');}
  });
  const external=clickFor({href:'https://github.com/weepwood/nimbus-demo',hasAttribute:()=>false});
  const internal=clickFor({href:'https://weepwood.github.io/nimbus-demo/components/',hasAttribute:()=>false});
  assert.equal(handler(external.event),false);
  assert.equal(handler(internal.event),false);
  assert.equal(external.wasPrevented(),false);
  assert.equal(internal.wasPrevented(),false);
});

test('嵌入时不拦截下载或非 Web 协议链接',()=>{
  const handler=createEmbeddedLinkHandler({embedded:true,pageUrl:'https://weepwood.github.io/nimbus-demo/',postMessage(){}});
  const download=clickFor({href:'https://github.com/weepwood/nimbus-demo/archive/main.zip',hasAttribute:name=>name==='download'});
  const mail=clickFor({href:'mailto:hello@example.com',hasAttribute:()=>false});
  assert.equal(handler(download.event),false);
  assert.equal(handler(mail.event),false);
  assert.equal(download.wasPrevented(),false);
  assert.equal(mail.wasPrevented(),false);
});
