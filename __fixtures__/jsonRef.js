const jsonRef = '{"status":"root","children":[{"name":"common","children":[{"name":"follow","value":false,"status":"added"},{"name":"setting1","value":"Value 1","status":"unchanged"},{"name":"setting2","value":200,"status":"removed"},{"name":"setting3","oldValue":true,"newValue":null,"status":"changed"},{"name":"setting4","value":"blah blah","status":"added"},{"name":"setting5","value":{"key5":"value5"},"status":"added"},{"name":"setting6","children":[{"name":"doge","children":[{"name":"wow","oldValue":"","newValue":"so much","status":"changed"}],"status":"nested"},{"name":"key","value":"value","status":"unchanged"},{"name":"ops","value":"vops","status":"added"}],"status":"nested"}],"status":"nested"},{"name":"group1","children":[{"name":"baz","oldValue":"bas","newValue":"bars","status":"changed"},{"name":"foo","value":"bar","status":"unchanged"},{"name":"nest","oldValue":{"key":"value"},"newValue":"str","status":"changed"}],"status":"nested"},{"name":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"removed"},{"name":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"status":"added"}]}';
export default jsonRef;
