/**
 * This class builds the header menu to add the sticky note zone, the symbols, etc.
 *
 * @author $Author$
 */
var SwitchButton = React.createClass({
    getInitialState: function () {
        var enable = false;
        if (!this.props.main.user.isSelectedTemplate()) {
            if (this.props.main.user.hasGlobalRight('EditProject') && this.props.main.user.isAdminProfile()) {
                enable = true;
            } else if (this.props.main.user.hasGlobalRight('EditProject') && this.props.main.user.hasEditRightProject(this.props.main.user.getCurrentBoardId())) {
                enable = true;
            }
        }
        return {enable: enable};
    },

    onSwitchModeClick: function () {
        if (this.state.enable) {
            var controller = this.props.main.authController;
            var changePageFunc = this.props.main.classType == "CGMainEdition" ?
                $.proxy(controller.goToUse, controller) :
                $.proxy(controller.goToEdition, controller);

            //get the name of other mode
            var mode = this.props.main.mode === "use" ? "edit" : "use";

            var message = ""

            if(this.props.main.actualZoomNode.classType === "CGZoneZoomMyCanvas"){
                message = labels.MY_CANVAS.INFORMATION;
            }

            message += "Are you sure you want to switch to " + mode + " mode ?";


            // Ask for changing the page
            vvmPopupHelper.openDialog(message,changePageFunc,null);
        }
    },
    render: function () {
        var switchBtnDisplayed;
        if (!this.state.enable) {
            switchBtnDisplayed = "none";
        }
        return (
            <div className="topActionBtn" style={{display: switchBtnDisplayed}} onClick={this.onSwitchModeClick} title={labels.MENU.HEADER.TITLE.SWITCH_MODE}>
                <i className="fa fa-exchange"></i>
            </div>
            )
    }
});
var PlayButton = React.createClass({
    getInitialState: function () {
        this.classType = "CGSlideShowButton";
        return {text: "fa fa-play"};
    },
    switchIcon: function () {
        this.setState({text: this.state.text === 'fa fa-play' ? 'fa fa-pause' : 'fa fa-play'});
        this.props.main.topMenuEventHandle._onClickSlideShow();
    },
    render: function () {
        return (
            <div className="topActionBtn" onClick={this.switchIcon} title={labels.MENU.HEADER.TITLE.SLIDESHOW}>
                <i className={this.state.text}  ></i>
            </div>
            )
    }
});
var MeetingButton = React.createClass({
    componentDidMount: function () {
        this.props.main.menu.meetingMode = this;
    },
    onClick: function () {
        this.props.main.topMenuEventHandle._onClickMeetingMode();
    },
    render: function () {
        if (this.props.main.isMeetingMode) {
            return (
                <div className="topActionBtn meetingMode" onClick={this.onClick} title={labels.MENU.HEADER.TITLE.MEETING_MODE}>
                    <i className="fa fa-users"></i>
                </div>
                )
        } else {
            return (
                <div className="topActionBtn" onClick={this.onClick} title={labels.MENU.HEADER.TITLE.MEETING_MODE}>
                    <i className="fa fa-users"></i>
                </div>
                )
        }
    }
});
var ClockShow = React.createClass({
    getInitialState: function () {
        var model = {};
        model.time = "00:00";
        model.current = 0;
        model.clockTimeout = undefined;
        model.clockInterval = undefined;
        return model;
    },
    componentDidMount: function () {
        this.props.main.menu.clockShow = this;
    },
    startClock: function () {
        if (this.props.main.mode === "use") {
            this.state.clockTimeout = setTimeout($.proxy(this.updateClock, this), 1000);
        }
    },
    formatClock: function (number) {
        var text = "00";
        if (number < 10) {
            text = "0" + number;
        } else if (number < 60) {
            text = number;
        }
        return text;
    },
    updateClock: function () {
        if (this.props.main.isMeetingMode) {
            // Run slide show
            this.state.clockInterval = setInterval($.proxy(function () {
                this.state.current++;
                var origin = this.state.current;
                var text = "00:00";
                var seconds = origin % 60;
                var minutes = parseInt(origin / 60);
                text = this.formatClock(minutes) + ":" + this.formatClock(seconds);
                this.setState({time: text});
            }, this), 1000);
        }
    },
    /** restart the timeout when action is performed**/
    restartTimeout: function () {
        if (this.props.main.mode === "use" && this.props.main.isMeetingMode) {
            this.stopClock();
            this.state.clockTimeout = setTimeout($.proxy(this.startClock, this), 1000);
            this.state.current = 0;
        }
    },
    stopClock: function () {
        clearTimeout(this.state.clockTimeout);
        clearInterval(this.state.clockInterval);
        this.state.current = 0;
    },
    render: function () {
        var clockDisplayed;
        if (!this.props.main.isMeetingMode) {
            clockDisplayed = "none";
        }
        return (
            <div className="topActionBtn clockShow" style={{display: clockDisplayed}} >
               {this.state.time}
            </div>
            )
    }
})

var HistoryButton = React.createClass({
    onClick: function () {
        this.props.main.topMenuEventHandle._onClickReleaseNotes();
    },
    render: function () {
        return (
            <div className="topActionBtn" onClick={this.onClick} title={labels.MENU.HEADER.TITLE.HISTORY}>
                <i className="fa fa-file-text-o"></i>
            </div>
            )
    }
});

var QuitButton = React.createClass({
    onClick : function () {
        this.props.main.topMenuEventHandle._onClickLogout();
    },
    render: function () {
        return (
            <div className="topActionBtn" onClick={this.onClick} title={labels.MENU.HEADER.TITLE.QUIT}>
                <i className="fa fa-power-off"></i>
            </div>
            )
    }
});

var SettingButton = React.createClass({
    getInitialState: function () {
        var model = {};
        model.isTurnOff = false;
        model.displayed = false;
        return model;
    },
    /**
     * Mark a flag that indicates the image is going to be exported without the menu displayed.
     * When it will be finished, we done to display the menu.
     *
     * @param event Object the event
     */
    onClickExportPng: function (event) {
        if (BrowserDetect.browser == "Explorer") {
            vvmPopupHelper.openAlert("This function is not supported by this version of Internet Explorer. " +
                    "Please switch to Google chrome or Firefox to use this function", "OK",
                undefined);
            return;
        }

        if (!this.props.main.isMeetingMode) {
            this.exportPNG();
        } else {
            var exportPNGFunc = $.proxy(this.props.main.zoomController.exportPNG, this.props.main.zoomController);
            exportPNGFunc();
        }
    },

    /**
     * Export the dashboard in CSV format by calling the service which generates the file.
     *
     * @param event Object the event
     */
    onClickExportCsv: function (event) {
        if (!this.props.main.isMeetingMode) {
            this.exportCSV();
        } else {
            var exportCSVFunc = $.proxy(this.props.main.zoomController.exportCSV, this.props.main.zoomController);
            exportCSVFunc();
        }
    },

    /**
     * Highlight the sticky nodes that due date and will be due date.
     *
     * @param event Object the event
     */
    onClickTurnOffHighlighting: function (event) {
        if (!this.props.main.isMeetingMode) {
            if (this.props.main.zoomed) {
                this.populatedHighlight();
            }
        } else {
            var turnOffHighlightingFunc = $.proxy(this.props.main.zoomController.turnOffHighlighting,
                this.props.main.zoomController);
            turnOffHighlightingFunc();
        }
    },

    /**
     * userGuide.
     * @param context
     */
    onClickUserGuide: function (context) {
        if (!this.props.main.isMeetingMode) {
            this.showUserGuide();
        } else {
            var showUserGuideFunc = $.proxy(this.props.main.zoomController.showUserGuide, this.props.main.zoomController);
            showUserGuideFunc();
        }
    },

    /**
     * CLF.
     * @param context
     */
    onClickClfSquare: function (context) {
        if (!this.props.main.isMeetingMode) {
            this.showLeanFoundation();
        } else {
            var showLeanFoundationFunc = $.proxy(this.props.main.zoomController.showLeanFoundation,
                this.props.main.zoomController);
            showLeanFoundationFunc();
        }
    },

    /**
     * Report Issue button
     */
    onClickReportIssue: function (context) {
        if (!this.props.main.isMeetingMode) {
            this.showITSM();
        } else {
            var showITSMFunc = $.proxy(this.props.main.zoomController.showITSM, this.props.main.zoomController);
            showITSMFunc();
        }
    },

    /**
     * Retrieve list Sticky Node in actual zoom which is overrun.
     * @return List of node.
     */
    retrieveHighlightFeatureNode: function () {
        var traverseSN = new CGSGTraverser();

        // Find all Sticky Node Feature in actual Zoom Node.
        var snFeatureArray = traverseSN.traverse(this.props.main.actualZoomNode, $.proxy(function (node) {
            return (node.classType === "CGStickyNoteFeature");
        }, this), []);

        return snFeatureArray;
    },

    /**
     * Retrieve list Sticky Node in actual zoom which is overrun.
     * @return List of node.
     */
    retrieveHighlightTrackerNode: function () {
        var traverseSN = new CGSGTraverser();

        // Find all Sticky Node Tracker in actual Zoom Node.
        var snTrackerArray = traverseSN.traverse(this.props.main.actualZoomNode, $.proxy(function (node) {
            return (node.classType === "CGStickyNoteTracker");
        }, this), []);

        return snTrackerArray;
    },

    /**
     * Retrieve list Sticky Node in actual zoom which is overrun.
     * @return List of node.
     */
    retrieveHighlightActionNode: function () {
        var traverseSN = new CGSGTraverser();
        var nodes = [];

        // Find all Sticky Nodes Action in actual Zoom Node
        var snActionArray = traverseSN.traverse(this.props.main.actualZoomNode, $.proxy(function (node) {
            return (node.classType === "CGStickyNoteAction");
        }, this), []);

        return snActionArray;
    },

    /**
     * populate highlighting sticky node
     */
    populatedHighlight: function () {
        // Find all Sticky Node Feature in actual Zoom Node.
        var featureNodes = this.retrieveHighlightFeatureNode();
        var trackerNodes = this.retrieveHighlightTrackerNode();
        var actionNodes = this.retrieveHighlightActionNode();
        if (this.state.isTurnOff) {
            for (var i = 0; i < featureNodes.length; i++) {
                var stickyNode = featureNodes[i];
                stickyNode.isTurnOffHighlighting = false;
                stickyNode.initCanvas();
            }

            for (var i = 0; i < trackerNodes.length; i++) {
                var stickyNode = trackerNodes[i];
                stickyNode.isTurnOffHighlighting = false;
                stickyNode.initCanvas();
            }

            for (var i = 0; i < actionNodes.length; i++) {
                var stickyNode = actionNodes[i];
                stickyNode.isTurnOffHighlighting = false;
                stickyNode.initCanvas();
            }

            this.setState({isTurnOff: false});

        } else {
            for (var i = 0; i < featureNodes.length; i++) {
                var stickyNode = featureNodes[i];
                stickyNode.isTurnOffHighlighting = true;
                stickyNode.initCanvas();
            }

            for (var i = 0; i < trackerNodes.length; i++) {
                var stickyNode = trackerNodes[i];
                stickyNode.isTurnOffHighlighting = true;
                stickyNode.initCanvas();
            }

            for (var i = 0; i < actionNodes.length; i++) {
                var stickyNode = actionNodes[i];
                stickyNode.isTurnOffHighlighting = true;
                stickyNode.initCanvas();
            }

            this.setState({isTurnOff: true});
        }
        this.props.main.isRender = true;
    },

    /**
     * show new window user guide
     */
    showUserGuide: function () {
        window.open(CG_HELP_LINK, 'Help');
    },

    /**
     * show new window lean foundation
     */
    showLeanFoundation: function () {
        window.open(CG_CLF_LINK, 'CLF');
    },

    /**
     * Show new window ITSM page
     */
    showITSM: function () {
        window.open(CG_ITSM_LINK, 'ITSM');

        if (this.props.main.zoomedNode !== undefined && this.props.main.zoomedNode !== null &&
            this.props.main.zoomedNode.zoomType === "webview") {
            var canvas = document.getElementById("scene");
            canvas.style.zIndex = 0;
            var context = canvas.getContext('2d');
            context.globalAlpha = 1;
        }
    },

    /**
     * export CSV file
     */
    exportCSV: function () {
        this.props.main.exportController.exportToCsv();
        if (this.props.main.zoomedNode !== undefined && this.props.main.zoomedNode !== null &&
            this.props.main.zoomedNode.zoomType === "webview") {
            var canvas = document.getElementById("scene");
            canvas.style.zIndex = 0;
            var context = canvas.getContext('2d');
            context.globalAlpha = 1;
        }
    },

    /**
     * export PNG file
     */
    exportPNG: function () {

        this.props.main.originalCanvasDimension =
            new CGSGDimension(this.props.main.canvas.width, this.props.main.canvas.height);

        // Create a function that will rollback all modifications after the export has finished
        var rollback = function () {
            this.props.main.root.translateTo(0, 0);
            this.props.main.root.addChild(this.props.main.menuHeader.root);
            this.props.main.canvas.height = this.props.main.originalCanvasDimension.height;
            this.props.main.canvas.width = this.props.main.originalCanvasDimension.width;
            this.props.main.sceneGraph.setCanvasDimension(this.props.main.originalCanvasDimension);
            this.props.main.setDisplayRatio(computeDisplayRatio());

            // Add menu closer after detach from export PNG
            this.props.main.root.addChild(this.props.main.menuCloser.root);

            // Add menu right after detach from export PNG
            this.props.main.root.addChild(this.props.main.menuRight.root);

            // Add menu footer after detach from export PNG
            this.props.main.root.addChild(this.props.main.menuFooter.root);
        };

        // The function will be run after export which will be detected using the 'exportingImage' flag
        this.props.main.rollbackExport = $.proxy(rollback, this);
        this.props.main.exportingImage = true;

        // Do not export the menu
        this.props.main.root.detachChild(this.props.main.menuHeader.root);

        // Do not export the menu closer
        this.props.main.root.detachChild(this.props.main.menuCloser.root);

        // Do not export the menu right
        this.props.main.root.detachChild(this.props.main.menuRight.root);

        // Do not export the menu footer
        this.props.main.root.detachChild(this.props.main.menuFooter.root);

        // Place the zoom to export on the top left corner
        this.props.main.root.translateTo(this.props.main.actualZoomNode.position.x * -1,
                this.props.main.actualZoomNode.position.y * -1);

        // Now we resize the canvas to fill the exported zoom dimensions
        var dimension = cgsgGetRealViewportDimension(event);
        var ratio;

        if (this.props.main.actualZoomNode.classType === "CGZoneZoom" ||
            this.props.main.actualZoomNode.classType === "CGZoneZoomKanBan") {
            if ((dimension.width / this.props.main.actualZoomNode.dimension.width) <
                (dimension.height / this.props.main.actualZoomNode.dimension.height)) {
                ratio = dimension.width / this.props.main.actualZoomNode.dimension.width;
            } else {
                ratio = dimension.height / this.props.main.actualZoomNode.dimension.height;
            }

            var expandRegion = this.props.main.actualZoomNode._expandRegionConstraint;
            var canvasDimension = new CGSGDimension((this.props.main.actualZoomNode._realDimension.width + expandRegion) * this.props.main.actualZoomNode._absoluteScale.x,
                    (this.props.main.actualZoomNode._realDimension.height + expandRegion + MENU_HEADER_HEIGHT + ZOOM_HEADER) * this.props.main.actualZoomNode._absoluteScale.y);

            this.props.main.canvas.height = canvasDimension.height;
            this.props.main.canvas.width = canvasDimension.width;
            this.props.main.sceneGraph.setCanvasDimension(canvasDimension);
            this.props.main.setDisplayRatio(new CGSGScale(1, 1));
        }
        this.actionPerformed = true;
        if (this.props.main.zoomedNode !== undefined && this.props.main.zoomedNode !== null &&
            this.props.main.zoomedNode.zoomType === "webview") {
            var canvas = document.getElementById("scene");
            canvas.style.zIndex = 0;
            var context = canvas.getContext('2d');
            context.globalAlpha = 1;
        }
        this.props.main.isRender = true;
    },

    onClickSupport: function () {
        window.location = "http://my3d.capgemini.com";
    },

    onMouseEnter: function () {
        this.setState({displayed: true});
    },
    onMouseOut: function () {
        this.setState({displayed: false});
    },

    stopPropagation: function (event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    },

    render: function () {
        var highlight = "Turn Off Highlighting";
        var displayed = "none";
        if (this.state.isTurnOff) {
            highlight = "Turn On Highlighting";
        }

        if (this.state.displayed) {
            displayed = "block";
        }
        return (
            <div className="topDropDownIcoLabel"  onMouseOver={this.onMouseEnter} onMouseOut={this.onMouseOut}>
                <div className="topActionBtn" title={labels.MENU.HEADER.TITLE.SETTINGS}>
                    <i className="fa fa-cog"></i>
                </div>

                <div className="dropDownItemWrapper" onMouseEnter={this.onMouseEnter} onMouseOut={this.onMouseOut} style={{display: displayed, marginLeft: "-80px", minWidth: "150px"}}>
                    <div className="dropDownItem" >
                        <p className="topLabel topLabelEnabled" onMouseEnter={this.onMouseEnter} onClick={this.onClickClfSquare} >{labels.MENU.HEADER.SETTINGS_BUTTON.CLF}</p>
                    </div>
                    <div className="dropDownItem" >
                        <p className="topLabel topLabelEnabled" onMouseEnter={this.onMouseEnter} onClick={this.onClickSupport} title={labels.MENU.HEADER.SETTINGS_BUTTON.SUPPORT}>{labels.MENU.HEADER.SETTINGS_BUTTON.SUPPORT}</p>
                    </div>
                    <div className="dropDownItem" >
                        <p className="topLabel topLabelEnabled " onMouseEnter={this.onMouseEnter} onClick={this.onClickUserGuide} >{labels.MENU.HEADER.SETTINGS_BUTTON.USER_GUIDE}</p>
                    </div>
                    <div className="dropDownItem" >
                        <p className="topLabel topLabelEnabled" onMouseEnter={this.onMouseEnter} onClick={this.onClickTurnOffHighlighting} >{highlight}</p>
                    </div>
                    <div className="dropDownItem" >
                        <p className="topLabel topLabelEnabled" onMouseEnter={this.onMouseEnter} onClick={this.onClickExportCsv}  >{labels.MENU.HEADER.SETTINGS_BUTTON.CSV_FORMAT}</p>
                    </div>
                    <div className="dropDownItem" >
                        <p className="topLabel topLabelEnabled"  onMouseEnter={this.onMouseEnter} onClick={this.onClickExportPng} >{labels.MENU.HEADER.SETTINGS_BUTTON.PNG_FORMAT}</p>
                    </div>
                </div>
            </div>
            )
    }
});


var BreadCrumb = React.createClass({
    getInitialState: function () {
        var model,
            tools = [
                {
                    title: "Skills Management",
                    url: "http://grcweb.capgemini.com/Home"
                },
                {
                    title: "Continuous Improvement",
                    url: "http://ciportal.capgemini.com/"
                },
                {
                    title: "Standard Work",
                    template: true
                },
                {
                    title: "Maturity Assessment",
                    url: "http://leanmaturity.capgemini.com/AspxPages/FrmHome.aspx"
                },
                {
                    title: "EcSOP",
                    url: "http://ecsop.capgemini.com/"
                }
            ];

        model = this.getProjectState();
        model.tools = tools;

        return model;
    },
    getProjectState: function () {
        var model = {
                actualBoard: {},
                actualZZ: {},
                boards: [],
                zoomZones: []
            },
            that = this;

        var allEngagements = [];

        // keep all engagements
        _.each(this.props.main.user.user.programs, function (program) {
            if (program.template !== true) {

                _.each(program.engagements, function (engagement) {
                    if (engagement.projects.length > 0) {
                        engagement.programId = program.id;
                        allEngagements.push(engagement);
                    }
                });
            }
        });

        // Sort the engagement by Name
        var allEngagementsSorted = _.sortBy(allEngagements, function (key) {
            return key.name;
        });

        _.each(allEngagementsSorted, function (engagement) {

            // Check if we are in this engagement
            if (engagement.projects.length > 1 || (engagement.projects.length == 1 && engagement.id != that.props.main.user.selectedEngagementId)) {
                model.boards.push(engagement);
            }

            // sort all project for a engagement given
            var allProjectSorted = _.sortBy(engagement.projects, function (key) {
                return key.name;
            });

            _.each(allProjectSorted, function (project) {
                if (project.id == that.props.main.user.selectedBoardId) {
                    project.engagementId = engagement.id;
                    project.programId = engagement.programId;
                    model.actualBoard = project;
                } else {
                    project.engagementId = engagement.id;
                    project.programId = engagement.programId;
                    model.boards.push(project);
                }
            });
        });

        if (this.props.main.rootZoom) {
            var that = this;
            _.each(this.props.main.rootZoom.children, function (zoomZone) {
                if (that.props.isZoomed && zoomZone.nodeId == that.props.main.actualZoomNode.nodeId) {
                    model.actualZZ = {
                        title: zoomZone.title,
                        id: zoomZone.nodeId,
                        projectId: zoomZone.projectId
                    }
                } else {
                    if (zoomZone.classType === labels.CLASS_TYPE.WEBVIEW) {
                        if (!_.isNull(zoomZone.typeOfWebview) && zoomZone.typeOfWebview === "InATab") {
                            // do nothing
                        } else {
                            model.zoomZones.push({
                                title: zoomZone.title,
                                id: zoomZone.nodeId,
                                projectId: zoomZone.projectId
                            })
                        }
                    } else {
                        model.zoomZones.push({
                            title: zoomZone.title,
                            id: zoomZone.nodeId,
                            projectId: zoomZone.projectId
                        })
                    }
                }
            })
            if (!this.props.isZoomed) {
                model.actualZZ = {
                    title: "Dashboard",
                    id: -1,
                    projectId: -1
                }
            }
        }

        return model;
    },
    onBoardClick: function (e) {
        //set Selected program
        var setSelectedProgramId = $.proxy(this.props.main.user.setSelectedProgramId, this.props.main.user);
        console.debug();
        setSelectedProgramId(e.programId);

        //set Selected Engagement
        var bindSetSelectedEngagementId = $.proxy(this.props.main.user.setSelectedEngagementId, this.props.main.user);
        bindSetSelectedEngagementId(e.engagementId);

        //set the board
        var bindSetSelectedBoardId = $.proxy(this.props.main.user.setSelectedBoardId, this.props.main.user);
        bindSetSelectedBoardId(e.id);
        sessionStorage.boardName = e.name;

        sessionStorage.dashboardTitle = this.props.main.user.getBoardType(this.props.main.user.selectedProgramId, this.props.main.user.selectedEngagementId, this.props.main.user.selectedBoardId) + ' - ' + e.name;
        window.location = '?page=use';

        this.props.main.menu.header.setState({isZoomed: false});

    },
    onZoomZoneClick: function (node, event) {
        var main = this.props.main,
            zoomList = main.rootZoom.children,
            selectedZone;

        _.each(zoomList, function (item) {
            if (item.nodeId == node.id) {
                selectedZone = item;
            }
        })

        var callback = $.proxy(function () {
            // Be sure that the animation is finished
            setTimeout($.proxy(function () {
                // Set render flag to allow system render canvas again
                main.isRender = true;

                // Put the node over the other nodes
                main.actualZoomNode.detachChild(selectedZone);
                main.actualZoomNode.addChild(selectedZone);

                // Animate the zoom
                selectedZone.doZoom();

                // Deselect (selected in edition mode)
                main.sceneGraph.deselectNode(selectedZone);
                main.isRender = true;

                if (main.mode === "use") {
                    // tracking history Zoom Node.
                    main.zoomController.createTrackHistoryZoomNode(main.user.user.login,
                        selectedZone.projectId, selectedZone.nodeId,
                        selectedZone.dimension.x, selectedZone.dimension.y,
                        1, 1, ZOOM_NODE_STATUS_ZOOM_OUT, 0, 0);
                }
            }, this), 100);
        }, this);

        if (main.zoomed) {
            main.zoomedNode.undoZoom(callback);
            main.isRender = true;
        } else {
            callback();
        }
    },

    onToolsClick: function (item) {
        if (item.url) {
            window.location = item.url;
        }
    },
    onLogoClick: function () {
        window.location = "http://my3d.capgemini.com";
    },
    render: function () {
        var model = this.getProjectState(),
            that = this;
        return (
            <div>
                <div className="topBtn" onClick={this.onLogoClick} title={labels.MENU.HEADER.TITLE.HOME}>
                    <img alt="logo_login" src="images/logo_VVM.png"/>
                </div>
                <div className="topDropDown">
                    <div className="topBtn" title={labels.MENU.HEADER.TITLE.TOOLS}>
                        <i className="fa fa-chevron-down topDropDownIco"></i>
                        <p className="topLabel">
                        Visual Management
                        </p>
                    </div>
                    <div className="dropDownItemWrapper">
                        {this.state.tools.map(function (result, i) {
                            if (result.template) {
                                return (<div className="dropDownItem" key={i}>
                                    <p className="topLabel topLabelDisabled">{result.title}</p>
                                </div>)
                            } else {
                                return (<div className="dropDownItem" key={i}>
                                    <p className="topLabel topLabelEnabled"  onClick={that.onToolsClick.bind(this, result)}  title={result.title} >{result.title} </p>
                                </div>)
                            }
                        }, this)}
                    </div>
                </div>


                <div className="topDropDown">
                    <div className="topBtn" title={labels.MENU.HEADER.TITLE.BOARDS}>
                        <i className="fa fa-chevron-down topDropDownIco"></i>
                        <p className="topLabel">
                            {model.actualBoard.name}
                        </p>
                    </div>

                    <div className="dropDownItemWrapper">
                        {model.boards.map(
                            function (item, i) {
                                if (item.engagementId) {
                                    return (<div className="dropDownItem" key={i}>
                                        <p className="topLabel topLabelEnabled"  onClick={that.onBoardClick.bind(this, item)} title={item.name}>{item.name}</p>
                                    </div>
                                        )
                                } else {
                                    return (<div className="dropDownItem" key={i}>
                                        <p className="topLabel topLabelDisabled" >{item.name}</p>
                                    </div>)
                                }
                            }, this)}
                    </div>
                </div>
                <div className = "topDropDown" >
                    <div className="topBtn" title={labels.MENU.HEADER.TITLE.ZOOMZONES}>
                        <i className="fa fa-chevron-down topDropDownIco"></i>
                        <p className="topLabel">
                            {model.actualZZ.title}
                        </p>
                    </div>
                    <div className = "dropDownItemWrapper">
                                {model.zoomZones.map(function (result, i) {
                                    return (<div className="dropDownItem" key={i}>
                                        <p className="topLabel topLabelEnabled" onClick={this.onZoomZoneClick.bind(this, result)} title={result.title}>{result.title} </p>
                                    </div>)
                                }, this)}
                    </div>
                </div>
            </div>)
    }
});


var Header = React.createClass({
    getInitialState: function () {
        return {isZoomed: false};
    },
    render: function () {
        return (
            <div className="header">
                <div className="topBar">


                </div>
            </div>
            );
    }
});
