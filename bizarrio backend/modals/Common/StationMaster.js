const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema(
  {
    ParentStationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "station_master",
      default: null,
    },
    OrgUnitLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "org_unit_type_master", // dropdown reference
    },
    StationName: {
      type: String,
      trim: true,
    },
    CountryGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country_group_type_master", // dropdown reference
    },
    ISDCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "isd_code_type_master", // dropdown reference
    },
    Currency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "currency_type_masters", 
    },
    StationAdmins: [
      {
        Name: String,
        MobileNumber: String,
        Email: String,
        Password: String,
      },
    ],
    CensusYear: {
      type: Number,
    },
    PopulationMale: {
      type: Number,
      default: 0,
    },
    PopulationFemale: {
      type: Number,
      default: 0,
    },
    TotalPopulation: {
      type: Number,
      default: 0,
    },
    LiteracyRate: {
      type: Number, // percentage (0–100)
      default: 0,
    },
    AreaSQKM: {
      type: Number,
      default: 0,
    },
    IsActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("station_master", StationSchema);
