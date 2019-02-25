/**
 * 数据加载提示框
 */
import styles from './index.less';

let loadingNum = 0;

const Loading = (function() {
  return {
    open(text = '正在处理,请稍等...') {
      loadingNum++;
      if (loadingNum > 1) {
        return;
      }
      // 生成dom
      const doc = window.document;
      this.node = doc.createElement('div');
      this.node.className = styles.my_loading;
      let node2 = doc.createElement('div');
      node2.className = styles.my_loading_wrap;
      this.node.appendChild(node2);
      let node3 = doc.createElement('section');
      node3.className = styles.my_loading_content;
      node2.appendChild(node3);
      let node4 = doc.createElement('i');
      node4.className = styles.my_loading_img;
      let node5 = doc.createElement('span');
      node5.className = styles.my_loading_text;
      node5.innerHTML = text;
      node3.appendChild(node4);
      node3.appendChild(node5);
      doc.body.appendChild(this.node);
    },
    close() {
      loadingNum--;
      if (loadingNum > 0) {
        return;
      }
      this.node && window.document.body.removeChild(this.node);
    }
  };
})();

export default Loading;
