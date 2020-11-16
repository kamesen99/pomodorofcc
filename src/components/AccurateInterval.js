

export const AccurateInterval = (fn, time) => {
      var cancel, nextAt, timeout, wrapper;
      nextAt = new Date().getTime() + time;
      console.log("Accurate Interval!")
      timeout = null;
      wrapper = function() {
        nextAt += time;
        timeout = setTimeout(wrapper, nextAt - new Date().getTime());
        return fn();
      };
      cancel = function() {
        return clearTimeout(timeout);
      };
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return {
        cancel: cancel
      };
    };
