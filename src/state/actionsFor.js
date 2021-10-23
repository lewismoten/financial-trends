import PACKAGE from '../../package.json';
const actionsFor = slice => action => `${PACKAGE.name} [${slice}] ${action}`;
export default actionsFor;
