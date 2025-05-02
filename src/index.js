import codegen from "codegen.macro";

codegen`module.exports = require('@ihollander/workshop-app/codegen')`;

// Temporary fix (place at the top of your main file)
jest.mock('@styled-icons/heroicons-outline/ExternalLink', () => 'div');
