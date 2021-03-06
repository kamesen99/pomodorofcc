

export const AccurateInterval = (fn, time) => {
      var cancel, nextAt, timeout, wrapper;
      nextAt = new Date().getTime() + time;
      timeout = null;
      wrapper = function() {
        nextAt += time;
        timeout = setTimeout(wrapper, nextAt - new Date().getTime());
        return fn();
      };
      cancel = function() {
        console.log("AI cancel")
        return clearTimeout(timeout);
      };
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return {
        cancel: cancel
      };
    };
