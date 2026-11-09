import { sequelize, DataTypes } from "../db";

const ChildModel = sequelize.define("children", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: { type: DataTypes.STRING(80), allowNull: false },
    lastName: { type: DataTypes.STRING(80), allowNull: false },
    dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
    guardianName: { type: DataTypes.STRING(120), allowNull: false },
    guardianPhone: { type: DataTypes.STRING(30), allowNull: false },
    emergencyContact: { type: DataTypes.STRING(160), allowNull: true },
    allergies: { type: DataTypes.TEXT, allowNull: true },
    room: { type: DataTypes.STRING(80), allowNull: true },
    enrollmentStatus: {
        type: DataTypes.ENUM("enrolled", "waitlisted", "withdrawn"),
        allowNull: false,
        defaultValue: "enrolled",
    },
});

export default ChildModel;
