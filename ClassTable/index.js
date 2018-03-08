class ClassTable {
  constructor(lessones, opts) {
    this.lessones = lessones;
    this.opts = {
      CALNAME: "课程表",
      CALDESC: "重庆理工大学",
      COLOR: "#63DA48",
      TIMEZONE: "Asia/Shanghai",
      TRIGGER: "-PT45M",
      BEGINTIME: new Date("2018-01-01"),
      TIMETABLE: [
        ["0820", "0905"],
        ["0915", "1000"],
        ["1020", "1105"],
        ["1115", "1200"],
        ["1400", "1445"],
        ["1455", "1540"],
        ["1600", "1645"],
        ["1655", "1740"],
        ["1900", "1945"],
        ["1955", "2035"]
      ]
    };
    this.opts = Object.assign(this.opts, opts);
    this.opts.BEGINTIME = this.getCleanDate(this.opts.BEGINTIME);
    const { CALNAME, CALDESC, COLOR, TIMEZONE, TRIGGER } = this.opts;
    this.template = {
      head: `BEGIN:VCALENDAR
METHOD:PUBLISH
VERSION:2.0
X-WR-CALNAME:${CALNAME}
X-WR-CALDESC:${CALDESC}
PRODID:-//Apple Inc.//Mac OS X 10.11.6//EN
X-APPLE-CALENDAR-COLOR:${COLOR}
X-WR-TIMEZONE:${TIMEZONE}
CALSCALE:GREGORIA`,
      foot: "END:VCALENDAR"
    };
  }

  getCleanDate(d) {
    const date = new Date(d);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  getFormatDate(d) {
    const _ = num => (num + "").padStart(2, "0");
    return `${d.getFullYear()}${_(d.getMonth() + 1)}${_(d.getDate())}T${_(
      d.getHours()
    )}${_(d.getMinutes())}${_(d.getSeconds())}`;
  }

  timeToMS(t) {
    return (t.substring(0, 2) * 60 + parseInt(t.substring(2, 4))) * 1000 * 60;
  }

  export() {
    const {
      lessones,
      template,
      opts: { TIMEZONE, TRIGGER, BEGINTIME, TIMETABLE },
      getFormatDate,
      timeToMS
    } = this;
    const STAMP = getFormatDate(BEGINTIME) + "Z";
    let body = "";
    lessones.forEach(item => {
      const SUMMARY = item.name;
      const DTSTART = (d => {
        const date = new Date(d);
        date.setDate(date.getDate() + (item.startWeek - 1) * 7 + item.weekday);
        date.setTime(
          date.getTime() + timeToMS(TIMETABLE[item.startSection][0])
        );
        return getFormatDate(date);
      })(BEGINTIME);
      const DTEND = (d => {
        const date = new Date(d);
        date.setDate(date.getDate() + (item.startWeek - 1) * 7 + item.weekday);
        date.setTime(date.getTime() + timeToMS(TIMETABLE[item.endSection][1]));
        return getFormatDate(date);
      })(BEGINTIME);
      const INTERVAL = item.isDouble ? 2 : 1;
      const COUNT =
        (item.endWeek - item.startWeek) / (item.isDouble ? 2 : 1) + 1;
      const DESCRIPTION = `${item.name} ${item.teacher}`;
      const LOCATION = item.location;

      body += `
BEGIN:VEVENT
${SUMMARY}
DTSTAMP:${STAMP}
CREATED:${STAMP}
DTSTART;TZID=${TIMEZONE}:${DTSTART}
DTEND;TZID=${TIMEZONE}:${DTEND}
RRULE:FREQ=WEEKLY;INTERVAL=${INTERVAL};COUNT=${COUNT}
DESCRIPTION:${DESCRIPTION}
LOCATION:${LOCATION}
SUMMARY:${SUMMARY}
SEQUENCE:0
STATUS:CONFIRMED
TRANSP:OPAQUE
BEGIN:VALARM
TRIGGER:${TRIGGER}
DESCRIPTION:Event reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
`;
    });
    return template.head + body + template.foot;
  }
}

const lessones = [...document.querySelectorAll(`[rowspan="2"][align="Center"]`)]
  .reduce((cur, item) => {
    const sectionNodes = item.parentElement.querySelectorAll("td");
    const match = /第(.*)节/g.exec(sectionNodes[0].textContent);
    const section = parseInt(
      match ? match[1] : /第(.*)节/g.exec(sectionNodes[1].textContent)[1]
    );
    const week = item.cellIndex - (match ? 0 : 1);
    item.className = "lesson";
    item.innerHTML
      .split("<br>\n")
      .forEach(item =>
        cur.push(`周${week}第${section}-${section + 1}节\n${item}`)
      );
    return cur;
  }, [])
  .map(item => item.replace(/<br>/g, "").replace(/ /g, ""))
  .map(item => {
    const pattern = /周(.*)第(.*)-(.*)节\n(.*)\n.*?\{第(\d*)\-(\d*)周\|*(.*?)\}\n\d*\|?(.*?)\n(.*)/g;
    const match = pattern.exec(item);
    return {
      weekday: parseInt(match[1]) - 1,
      startSection: parseInt(match[2]) - 1,
      endSection: parseInt(match[3]) - 1,
      name: match[4],
      startWeek: parseInt(match[5]),
      endWeek: parseInt(match[6]),
      isDouble: match[7] !== "",
      teacher: match[8],
      location: match[9]
    };
  });

const classTable = new ClassTable(lessones, {
  BEGINTIME: new Date("2018-02-26")
});

console.log(classTable.export());
