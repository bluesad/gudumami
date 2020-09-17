
/** Cookie读、写、删除工具 */
var cookie = {
	/** 写Cookie */
    set: function(name, value, domain, path, hour) {//添加
        if (hour) {
            var expire = new Date();
            expire.setTime(expire.getTime() + 3600000 * hour);
        }
        document.cookie = name + "=" + escape(value) + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/;"+(domain ? "domain="+domain+";":""));
        return true;
    },/** 读Cookie */
    get: function(b) {
        var filterXSS = function(e) {//获取
            if (!e) return e;
            for (; e != unescape(e);) e = unescape(e);
            for (var r = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], n = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], a = 0; a < r.length; a++) e = e.replace(new RegExp(r[a], "gi"), n[a]);
            return e
        };
        var a;
        return filterXSS((a = document.cookie.match(RegExp("(^|;\\s*)" + b + "=([^;]*)(;|$)"))) ? unescape(a[2]) : '')
    },/** 删除Cookie */
    del: function(name, path) {//删除
        document.cookie = name + "=; expires=Mon, 26 Jul 1970 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ");
    }
};