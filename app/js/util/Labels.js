/**
 * Created with IntelliJ IDEA.
 * User: gadarras
 * Date: 24/06/15
 * Time: 08:10
 * To change this template use File | Settings | File Templates.
 */
"use strict";

var Labels = {

    URL: {
        HOME: "http://vvm.capgemini.com/visualmanagement"
    },

    MODE: {
        EDIT: "edit",
        USE: "use"
    },

    INFO_BAR: {
        MY_CANVAS: "myCanvas is in BETA. We are still developing some key features - try it and tell us what you think at my3d.capgemini.com !"
    },

    OVERVIEW: {
        KANBAN: {
            NO_STICKY: "No ETC information to display"
        },

        MIRROR: {
            NO_PREVIEW: "No information to display"
        }
    },

    MENU: {
        HEADER: {
            TITLE: {
                HOME: "Home",
                TOOLS: "Tools",
                BOARDS: "Boards",
                ZOOMZONES: "Zoom Zones",
                SLIDESHOW: "Slideshow",
                MEETING_MODE: "Meeting Mode",
                SWITCH_MODE: "Switch Mode",
                HISTORY: "Release Notes",
                SETTINGS: "Settings",
                QUIT: "Quit"
            },

            BREADCRUMB: {
                TOOLS: {
                    SKILL_MANAGEMENT: {
                        TITLE: "Skills Management",
                        URL: "http://grcweb.capgemini.com/Home"
                    },
                    CONTINUOUS_IMPROVEMENT: {
                        TITLE: "Continuous Improvement",
                        URL: "http://ciportal.capgemini.com/"
                    },
                    STANDARD_WORK: {
                        TITLE: "Standard Work"
                    },
                    MATURITY_ASSESSMENT: {
                        TITLE: "Maturity Assessment",
                        URL: "http://leanmaturity.capgemini.com/AspxPages/FrmHome.aspx"
                    },
                    ECSOP: {
                        TITLE: "EcSOP",
                        URL: "http://ecsop.capgemini.com/"
                    }
                },

                NAME: {
                    WEBVIEW: "Webview",
                    TICKETING: "Ticketing",
                    KANBAN: "Kanban Zone",
                    KANBAN_CTF: "Kanban Zone (CTF)",
                    FREE_ZOOM_ZONE: "Free Zone",
                    MY_CANVAS: "My Canvas",
                    MIRROR: "Mirrored"
                }
            },

            SETTINGS_BUTTON: {
                CLF: "CLF",
                SUPPORT: "Help & Support",
                USER_GUIDE: "User Guide",
                HIGHLIGHT: {
                    ON: "Turn On Highlighting",
                    OFF: "Turn Off Highlighting"
                },
                CSV_FORMAT: "Export as CSV",
                PNG_FORMAT: "Export as PNG"
            }
        },

        RIGHT: {
            SAVE_AS_TEMPLATE: "Save as Template",
            OPEN_TEMPLATE: "Open Template",
            CONFIRMATION_OPEN_TEMPLATE: "Do you want to override this project with a new board ?",
            ZOOMZONE: "Zoom Zone",
            FREE_STATUS_ZONES: "Free Status Zones",
            WEBVIEW: "WebView",
            TICKETING: "Ticketing",
            KANBAN: "Kanban",
            KANBAN_CTF: "Kanban CTF",
            MY_CANVAS: "MyCanvas",
            MIRROR: "ZZ from another board",
            STATUS_ZONE: "Status Zone",
            TEXT_AREA: "Text Area",
            PICTURE: "Picture",
            CUT: "Cut",
            COPY: "Copy",
            PASTE: "Paste",
            DELETE: "Delete"
        }
    },

    NAME: {
        WEBVIEW: "Webview",
        TICKETING: "Ticketing",
        KANBAN: "Kanban",
        KANBAN_CTF: "Kanban CTF",
        FREE_ZOOM_ZONE: "Free Zoom Zone",
        MY_CANVAS: "My Canvas",
        MIRROR: "Mirror"
    },

    CLASS_TYPE: {
        ROOT: "CGRootZoneZoom",
        WEBVIEW: "CGZoneZoomWebView",
        MYCANVAS : "CGZoneZoomMyCanvas",
        KANBAN : "CGZoneZoomKanBan",
        FREEZONE :"CGZoneZoom",
        TICKETING: "CGZoneZoomTicketing",
        MIRROR: "CGMirrorZoomZone"
    },

    ZOOM_TYPE: {
        WEBVIEW: "webview",
        TICKETING: "ticketing",
        KANBAN: "kanban",
        KANBAN_CTF: "kanbantracker",
        FREE_ZOOM_ZONE: "defaultZoom",
        MY_CANVAS: "myCanvas",
        MIRROR: "mirrorZoomZone"
    },

    MY_CANVAS: {
        PREVIEW: {
            EDIT_MODE: "Nothing to do."
        },
        INFORMATION: " Be careful -  in this BETA version your work will not be saved . You can export your canvas by clicking on Export PNG in the settings menu. "
    },

    WEBVIEW: {
        TYPE: {
            EMBEDDED: "Embedded",
            IN_A_TAB: "InATab"
        },

        PREVIEW: {
            LIVE_PREVIEW: "live_preview",
            DEFAULT_WEBVIEW: "default_web_view",
            IDEA: "idea",
            PIECHART: "pie_chart",
            SKILL_MANAGEMENT: "skills_management",
            VISUAL_MANAGEMENT: "visual_management",
            STANDARD_WORK_BOOK: "standard_work_book",
            JIRA: "Jira_Icon",
            SHAREPOINT: "SharePoint_Icon",
            TEAMFORGE: "Teamforge_Logo"
        }
    },

    KANBAN_TRACKER: {
        PREVIEW: {
            NEED_PASSWORD: "The board you selected includes a connection to another group app e.g. CTF -, so you'll need to enter your password",
            OK_BUTTON: "OK - take me to log in"
        }
    }

};

module.exports = Labels;