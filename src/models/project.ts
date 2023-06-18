import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class project extends Model {
    public id_project!: number;
    public no_nodin_rfsrfi!: string;
    public date_nodin_rfsrfi?: Date | null;
    public subject_nodin_rfsrfi?: string | null;
    public status?: ProjectsStatus | null;
    public detail_status?: string | null;
    public start_date_testing?: Date | null;
    public end_date_testing?: Date | null;
    public no_nodin_rfcitr?: string | null;
    public date_nodin_rfcitr?: Date | null;
    public subject_nodin_rfcitr?: string | null;
    public aging_from_nodin?: number | null;
    public aging_from_testing?: number | null;
    public divison?: string | null;
    public title_dev?: string | null;
    public pic_dev?: string | null;
    public notes_testing!: string;
    public testcase_amt?: number | null;
    public type_nodin?: ProjectsTypeNodin | null;
    public no_nodin_bo?: string;
    public subject_nodin_bo?: string | null;
    public date_nodin_bo?: Date | null;
    public subdir_bo?: string | null;
    public title_bo?: string | null;
    public pic_bo?: string | null;
    public dev_effort?: ProjectsDevEffort | null;
    public project_type?: ProjectsProjectType | null;
    public services?: string | null;
    public brand?: string | null;
    public pic_tester_1?: string | null;
    public pic_tester_2?: string | null;
    public pic_tester_3?: string | null;
    public pic_tester_4?: string | null;
    public pic_tester_5?: string | null;
    public testing_progress?: string | null;
    public selection!: boolean;
}

enum ProjectsStatus {
    BA = 'BA',
    DONE = 'DONE',
    IN_PROGRESS = 'IN PROGRESS',
    OPR_BA = 'OPR BA',
    ON_PROGRESS = 'ON PROGRESS',
}

enum ProjectsTypeNodin {
    RFS = 'RFS',
    RFI = 'RFI',
}

enum ProjectsDevEffort {
    Standard = 'Standard',
    Normal = 'Normal',
}

enum ProjectsProjectType {
    BAU = 'BAU',
    Project = 'Project',
}

project.init(
    {
        id_project: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        no_nodin_rfsrfi: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        date_nodin_rfsrfi: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        subject_nodin_rfsrfi: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        status: {
            type: DataTypes.ENUM<ProjectsStatus>(...Object.values(ProjectsStatus)),
            defaultValue: null,
        },
        detail_status: {
            type: DataTypes.STRING(100),
            defaultValue: null,
        },
        start_date_testing: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        end_date_testing: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        no_nodin_rfcitr: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        date_nodin_rfcitr: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        subject_nodin_rfcitr: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        aging_from_nodin: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        aging_from_testing: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        divison: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        title_dev: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        pic_dev: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        notes_testing: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        testcase_amt: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        type_nodin: {
            type: DataTypes.ENUM<ProjectsTypeNodin>(...Object.values(ProjectsTypeNodin)),
            defaultValue: null,
        },
        no_nodin_bo: {
            type: DataTypes.TEXT,
        },
        subject_nodin_bo: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        date_nodin_bo: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        subdir_bo: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        title_bo: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        pic_bo: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        dev_effort: {
            type: DataTypes.ENUM<ProjectsDevEffort>(...Object.values(ProjectsDevEffort)),
            defaultValue: null,
        },
        project_type: {
            type: DataTypes.ENUM<ProjectsProjectType>(...Object.values(ProjectsProjectType)),
            defaultValue: null,
        },
        services: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        brand: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        pic_tester_1: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        pic_tester_2: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        pic_tester_3: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        pic_tester_4: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        pic_tester_5: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        testing_progress: {
            type: DataTypes.STRING(200),
            defaultValue: null,
        },
        selection: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'project',
        tableName: 'projects',
        timestamps: true,

    }
);

export default project;
