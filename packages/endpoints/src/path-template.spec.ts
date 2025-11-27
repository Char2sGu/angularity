import { interpolatePathTemplate, parsePathTemplate } from './path-template';

describe('parsePathTemplateForParams', () => {
  it('should parse template with one param', () => {
    const actual = [...parsePathTemplate('/users/{{id}}')];
    expect(actual).toEqual(['id']);
  });

  it('should parse template with multiple params', () => {
    const actual = [...parsePathTemplate('/users/{{id}}/posts/{{postId}}')];
    expect(actual).toEqual(['id', 'postId']);
  });

  it('should parse template with no params', () => {
    const actual = [...parsePathTemplate('/users')];
    expect(actual).toEqual([]);
  });

  it('should parse string with only params', () => {
    const actual = [...parsePathTemplate('{{id}}')];
    expect(actual).toEqual(['id']);
  });

  it('should parse string with consecutive params', () => {
    const actual = [...parsePathTemplate('{{id}}/{{postId}}')];
    expect(actual).toEqual(['id', 'postId']);
  });
});

describe('interpolatePathTemplate', () => {
  it('should interpolate template with one param', () => {
    const actual = interpolatePathTemplate('/users/{{id}}', { id: '1' });
    expect(actual).toEqual('/users/1');
  });

  it('should interpolate template with multiple params', () => {
    const path = '/users/{{id}}/posts/{{postId}}';
    const actual = interpolatePathTemplate(path, { id: '1', postId: '2' });
    expect(actual).toEqual('/users/1/posts/2');
  });

  it('should interpolate template with no params', () => {
    const path = '/users';
    const actual = interpolatePathTemplate(path, {});
    expect(actual).toEqual('/users');
  });
});
