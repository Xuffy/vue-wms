import Util from 'service/util';

/**
 * 权限验证
 * @type {{bind(*, *): void}}
 */
const authorize = {
  bind(el, binding) {
    if (!Util.$auth(binding.value)) {
      el.remove();
    }

  }
}


export default {authorize};
