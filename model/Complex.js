export default function(connection, DataTypes) {
    const Complex = connection.define('Complex', {
            complexNo: {
                type: DataTypes.STRING(10),
                primaryKey: true
            },
            complexName: {
                type: DataTypes.STRING(30),
                allowNull: false
            },
            cortarNo: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            realEstateTypeCode: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            realEstateTypeName: {
                type: DataTypes.STRING(10),
                allowNull: false
            }, 
            detailAddress: DataTypes.STRING(50),
            roadAddress: DataTypes.STRING(50),
            latitude: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            longitude: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            totalHouseholdCount: DataTypes.INTEGER,
            totalLeaseHouseholdCount: DataTypes.INTEGER,
            permanentLeaseHouseholdCount: DataTypes.INTEGER,
            nationLeaseHouseholdCount: DataTypes.INTEGER,
            civilLeaseHouseholdCount: DataTypes.INTEGER,
            publicLeaseHouseholdCount: DataTypes.INTEGER,
            longTermLeaseHouseholdCount: DataTypes.INTEGER,
            etcLeaseHouseholdCount: DataTypes.INTEGER,
            highFloor: DataTypes.INTEGER,
            lowFloor: DataTypes.INTEGER,
            completionYearMonth: DataTypes.STRING(6),
            totalDongCount: DataTypes.INTEGER,
            maxSupplyArea: DataTypes.FLOAT,
            minSupplyArea: DataTypes.FLOAT,
            dealCount: DataTypes.INTEGER,
            rentCount: DataTypes.INTEGER,
            leaseCount: DataTypes.INTEGER,
            shortTermRentCount: DataTypes.INTEGER,
            isBookmarked: DataTypes.BOOLEAN,
            batlRatio: DataTypes.INTEGER,
            btlRatio: DataTypes.INTEGER,
            parkingCountByHousehold: DataTypes.FLOAT,
            constructionCompanyName: DataTypes.STRING(40),
            heatMethodTypeCode: DataTypes.STRING(20),
            heatFuelTypeCode: DataTypes.STRING(20),
            pyoengNames: DataTypes.STRING(50),
            address: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            roadAddressPrefix: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
        },
        {
            timestamps: true,
            underscored: false
        }
    )

    Complex.associate = models => {
        Complex.hasMany(models.Pyeong, {
            foreignKey: 'complexNo', 
            onDelete: 'cascade'
        })
    }

    return Complex
}


