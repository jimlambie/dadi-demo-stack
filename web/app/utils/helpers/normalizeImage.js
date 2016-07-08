var dust = require('dustjs-linkedin');

function traverseGetImage(input, depthLeft) {
  depthLeft -= 1
  if(depthLeft > 0) {
    if(typeof input === 'object') {
      if(input.image) {
        return traverseGetImage(input.image, depthLeft)
      }
      if(input.results) {
        return traverseGetImage(input.results, depthLeft)
      }
      if(input[0]) {
        return traverseGetImage(input[0], depthLeft)
      }
    }
  }
  return input
}

/**
Helper: normalizeImage
Extracts the image object out of nested things such as...
{ image: [ { results: [Object] } ] }
{ image: [Object] }

Usage:
{@normalizeImage image=.}
  The object found by diving into the passed in
  data structure is set as the context of this block
{/normalizeImage}
*/
dust.helpers.normalizeImage = function(chunk, context, bodies, params) {
  var image = traverseGetImage(params.image, 6);
  return chunk.render(bodies.block, context.push(image));
};