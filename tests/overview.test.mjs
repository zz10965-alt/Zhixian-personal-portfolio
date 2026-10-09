import test from 'node:test';
import assert from 'node:assert/strict';
import {visibleOverviewBlocks,videoEmbed} from '../src/lib/overview.mjs';
test('optional Overview blocks preserve order and omit deleted, blank or disabled content',()=>{
 const image={type:'image',src:'/images/projects/ecommerce.png'};
 const text={type:'text',paragraphs:['A finding']};
 const links={type:'links',links:[{label:'Notebook',url:'https://example.com'}]};
 assert.deepEqual(visibleOverviewBlocks([{type:'text',paragraphs:[' ']},image,{type:'links',links:[{label:'Hidden',url:'https://example.com',enabled:false}]},text,links,{type:'video',videoUrl:'javascript:alert(1)'}]),[image,text,links]);
 assert.deepEqual(visibleOverviewBlocks([links,image]),[links,image]);
 assert.deepEqual(visibleOverviewBlocks([]),[]);
});
test('video embedding accepts known providers and leaves other URLs as links',()=>{
 assert.equal(videoEmbed('https://youtu.be/dQw4w9WgXcQ'),'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
 assert.equal(videoEmbed('https://vimeo.com/123456'),'https://player.vimeo.com/video/123456');
 assert.equal(videoEmbed('https://example.com/video'),'');
});
