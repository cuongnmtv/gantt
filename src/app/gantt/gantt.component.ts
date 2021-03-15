import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { gantt } from 'dhtmlx-gantt';
import { Link } from '../models/link.model';
import { Task } from '../models/task.model';
import { LinkService } from '../services/link.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'gantt',
  //template: `<div #gantt_here class='gantt-chart'></div>`,
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class GanttComponent implements OnInit {

  @ViewChild("gantt_here", { static: true }) ganttContainer: ElementRef;

  constructor(private taskService: TaskService, private linkService: LinkService) { }

  ngOnInit() {
    gantt.config.xml_date = "%Y-%m-%d %H:%i";

    gantt.config.lightbox.sections = [
      { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
      {
        name: "priority", map_to: "priority", type: "radio", options: [
          { key: 1, label: "Thấp" },
          { key: 2, label: "Vừa" },
          { key: 3, label: "Cao" },
        ],
        default_value: 1
      },
      //{ name: "parent", height: 72, map_to: "parent", type: "parent" },
      {
        name: "parent", type: "parent", allow_root: "true", root_label: "Không có", filter: function (id, task) {
          /*	if(task.$level > 1){
              return false;
            }else{
              return true;
            }*/
          return true;
        }
      },
      //{ name: "time", height: 72, map_to: "auto", type: "duration" },
      { name: "time", height: 72, map_to: "auto", type: "time" }
    ];

    gantt.init(this.ganttContainer.nativeElement, new Date("2017-04-14"), new Date("2017-04-27"));

    gantt.templates.leftside_text = function (start, end, task) {
      return task.duration + " ngày";
    };

    gantt.plugins({
      fullscreen: false
    });

    gantt.config.grid_width = 500;
    gantt.templates.grid_row_class = function (start_date, end_date, item) {
      if (item.progress == 0) {
        return "red";
      }
      if (item.progress >= 1) {
        return "green";
      }
    };
    gantt.templates.task_row_class = function (start_date, end_date, item) {
      if (item.progress == 0) return "red";
      if (item.progress >= 1) return "green";
    };

    gantt.config.columns = [
      { name: "text", label: "Tên công việc", width: 150, align: "", tree: true },
      { name: "start_date", label: "Thời gian bắt đầu", width: 110, align: "", resize: true },
      { name: "duration", label: "Thời hạn", align: "", resize: true },
      {
        name: "progress", label: "Tiến độ", width: 110, align: "",
        template: function (item) {
          if (item.progress >= 1)
            return "Hoàn thành";
          if (item.progress == 0)
            return "Chưa bắt đầu";
          return Math.round(item.progress * 100) + "%";
        }
      },
      {
        name: "priority", label: "Độ ưu tiên", align: "", template: function (obj) {
          if (obj.priority == 3) {
            return "Cao"
          }
          if (obj.priority == 2) {
            return "Vừa"
          }
          return "Thấp"
        }
      },
      { name: "add", label: "", width: 44 }
    ];

    gantt.templates.task_class = function (start, end, task) {
      switch (task.priority) {
        case 1:
          return "high";
          break;
        case 2:
          return "medium";
          break;
        case 3:
          return "low";
          break;
      }
    };

    gantt.i18n.setLocale({
      date: {
        month_full: ["Tháng một", "Tháng hai", "Tháng ba", "Tháng tư", "Tháng năm", "Tháng sáu",
          "Tháng bảy", "Tháng tám", "Tháng chín", "Tháng mười", "Tháng mười một", "Tháng mười hai"],
        month_short: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
          "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        day_full: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm",
          "Thứ sáu", "Thứ bảy"],
        day_short: ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
      },
      labels: {
        new_task: "Công việc mới",
        icon_save: "Lưu",
        icon_cancel: "Hủy",
        icon_details: "Chi tiết",
        icon_edit: "Sửa",
        icon_delete: "Xóa",
        gantt_save_btn: "Lưu",
        gantt_cancel_btn: "Hủy bỏ",
        gantt_delete_btn: "Xóa",
        confirm_closing: "Thay đổi có thể bị mất, bạn có chắc chắn?",// Your changes will be lost, are you sure?
        confirm_deleting: "Công việc có thể bị xóa vĩnh viễn, bạn có chắc chắn?",
        section_description: "Tên công việc",
        section_priority: "Độ ưu tiên",
        section_time: "Khoảng thời gian",
        section_parent: "Công việc con của",
        section_type: "Loại",

        /* grid columns */
        column_wbs: "WBS",
        column_text: "Tên công việc",
        column_start_date: "Thời gian bắt đầu",
        column_duration: "Thời hạn",
        column_add: "",

        /* link confirmation */
        link: "Link",
        confirm_link_deleting: "Bạn có chắc chắn muốn xóa?",
        link_start: " (bắt đầu)",
        link_end: " (Kết thúc)",

        type_task: "Công việc",
        type_project: "Dự án",
        type_milestone: "Cột mốc",

        minutes: "Phút",
        hours: "Giờ",
        days: "Ngày",
        weeks: "Tuần",
        months: "Tháng",
        years: "Năm",

        /* message popup */
        message_ok: "Xác nhận",
        message_cancel: "Hủy bỏ",

        /* constraints */
        section_constraint: "Rằng buộc",
        constraint_type: "Loại rằng buộc",
        constraint_date: "Ngày rằng buộc",
        asap: "Sớm nhất có thể",
        alap: "Muộn nhất có thể",
        snet: "Bắt đầu không sớm hơn",
        snlt: "Bắt đầu không muộn hơn",
        fnet: "Hoàn thành không sớm hơn",
        fnlt: "Hoàn thành không muộn hơn",
        mso: "Phải bắt đầu vào",
        mfo: "Phải kết thúc vào",

        /* resource control */
        resources_filter_placeholder: "Gõ để lọc",
        resources_filter_label: "Ẩn"
      }
    });

    gantt.attachEvent("onLinkClick", function (id) {
      var link = this.getLink(id),
        src = this.getTask(link.source),
        trg = this.getTask(link.target),
        types = this.config.links;

      var first = "", second = "";
      switch (link.type) {
        case types.finish_to_start:
          first = "kết thúc";
          second = "bắt đầu";
          break;
        case types.start_to_start:
          first = "bắt đầu";
          second = "bắt đầu";
          break;
        case types.finish_to_finish:
          first = "kết thúc";
          second = "kết thúc";
          break;
      }

      gantt.message("Phải " + first + " <b>" + src.text + "</b> trước " + second + " <b>" + trg.text + "</b>");
    }, null);

    gantt.config.scales = [
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "week", step: 1, format: this.weekScaleTemplate },
      { unit: "day", step: 1, format: "%D", css: this.daysStyle }
    ];

    /*
    const dp = gantt.createDataProcessor({
      task: {
        update: (data: Task) => this.taskService.update(data),
        create: (data: Task) => this.taskService.insert(data),
        delete: (id) => this.taskService.remove(id)
      },
      link: {
        update: (data: Link) => this.linkService.update(data),
        create: (data: Link) => this.linkService.insert(data),
        delete: (id) => this.linkService.remove(id)
      }
    });
    */

    gantt.attachEvent("onAfterTaskAdd", function (id, item) {

      var description = gantt.getLightboxSection('description').getValue();
      var priority = gantt.getLightboxSection('priority').getValue();
      var parent = gantt.getLightboxSection('parent').getValue();
      var time = gantt.getLightboxSection('time').getValue();
      console.log('description' + description);
      console.log('priority' + priority);
      console.log('parent' + parent);
      console.log('time' + JSON.stringify(time, null, 4));
      console.log('id' + id);
      console.log('item' + JSON.stringify(item, null, 4));
    }, null);

    Promise.all([this.taskService.get(), this.linkService.get()])
      .then(([data, links]) => {
        gantt.parse({ data, links });
      });

  }

  daysStyle(date) {
    // you can use gantt.isWorkTime(date)
    // when gantt.config.work_time config is enabled
    // In this sample it's not so we just check week days

    if (date.getDay() === 0 || date.getDay() === 6) {
      return "weekend";
    }
    return "";
  }

  weekScaleTemplate(date) {
    var dateToStr = gantt.date.date_to_str("%d %M");
    var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
    return dateToStr(date) + " - " + dateToStr(endDate);
  }

  onToggle() {
    //gantt.message({ type: "error", text: "Invalid data format" });


  }
}
